// mongodb_schema_v2.mongosh.js
// Updated to match the data dictionary exactly
// Safe to run on fresh or existing DB. Non-destructive by default.
//
// Usage:
//   mongosh "$MONGO_URI" mongodb_schema_v2.mongosh.js

(function(){
  const VERSION = "v2_aligned";
  const log = (...args) => print(new Date().toISOString(), "-", ...args);

  function hasCollection(name) { return db.getCollectionNames().includes(name); }

  function ensureCollection(name, options) {
    if (!hasCollection(name)) {
      db.createCollection(name, options || {});
      log("created collection", name);
    } else if (options && options.validator) {
      db.runCommand({ collMod: name, validator: options.validator, validationLevel: options.validationLevel || "moderate" });
      log("reconciled validator", name);
    }
  }

  function ensureIndex(coll, keys, opts) {
    const existing = db.getCollection(coll).getIndexes();
    const name = (opts && opts.name) || Object.keys(keys).map(k => k + "_" + keys[k]).join("__");
    const found = existing.find(ix => ix.name === name);
    if (!found) {
      db.getCollection(coll).createIndex(keys, Object.assign({}, opts || {}, { name }));
      log("created index", coll, name);
    }
  }

  // ---------------------------
  // PROFILE DOMAIN
  // ---------------------------
  ensureCollection("profiles", {
    validationLevel: "moderate",
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["prf_profile_id","usr_user_id","prf_handle","prf_display_name","status_code"],
      properties: {
        prf_profile_id: { bsonType: "string" },
        usr_user_id: { bsonType: "string" },
        prf_handle: { bsonType: "string", pattern: "^[a-z0-9_]{3,32}$", maxLength: 32 },
        prf_display_name: { bsonType: "string", minLength: 1, maxLength: 80 },
        prf_bio: { bsonType: ["string","null"], maxLength: 1000 },
        prf_avatar_url: { bsonType: ["string","null"], maxLength: 1024 },
        prf_banner_url: { bsonType: ["string","null"], maxLength: 1024 },
        prf_location: { bsonType: ["string","null"], maxLength: 120 },
        prf_language: { bsonType: ["string","null"], pattern: "^[A-Za-z]{2,3}(-[A-Za-z]{2,8})*$" },
        prf_tags: { bsonType: ["array","null"], items: { bsonType: "string" }, maxItems: 20 },
        prf_visibility: { enum: ["public","followers","private"] },
        prf_moderation_state: { enum: ["pending","approved","rejected","flagged"] },
        prf_moderation_reason: { bsonType: ["string","null"], maxLength: 2000 },
        prf_links_count: { bsonType: ["int","long","double","decimal","null"], minimum: 0 },
        dag_score: { bsonType: ["int","long","double","decimal","null"], minimum: 0 },
        status_code: { enum: ["active","hidden","suspended","deleted"] },
        status_date: { bsonType: ["date","null"] },
        deleted_at: { bsonType: ["date","null"] },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] },
        created_by: { bsonType: ["string","null"] },
        updated_by: { bsonType: ["string","null"] }
      }
    }}
  });
  ensureIndex("profiles", { prf_handle: 1 }, { unique: true, name: "ux_prf_handle", partialFilterExpression: { status_code: { $ne: "deleted" } } });
  ensureIndex("profiles", { usr_user_id: 1 }, { unique: true, name: "ux_prf_user_active", partialFilterExpression: { status_code: { $ne: "deleted" } } });
  ensureIndex("profiles", { status_code: 1, status_date: -1 }, { name: "ix_prf_status_date" });
  ensureIndex("profiles", { prf_visibility: 1, created_at: -1 }, { name: "ix_prf_visibility_date" });

  // profile_links
  ensureCollection("profile_links", {
    validationLevel: "moderate",
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["prf_link_id","prf_profile_id","prf_link_label","prf_link_url"],
      properties: {
        prf_link_id: { bsonType: "string" },
        prf_profile_id: { bsonType: "string" },
        prf_link_label: { bsonType: "string", minLength: 1, maxLength: 60 },
        prf_link_url: { bsonType: "string", pattern: "^(https?://).+", maxLength: 512 },
        prf_link_order: { bsonType: ["int","long","double","decimal","null"], minimum: 0 },
        status_code: { enum: ["active","archived","deleted"] },
        status_date: { bsonType: ["date","null"] },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] },
        created_by: { bsonType: ["string","null"] },
        updated_by: { bsonType: ["string","null"] },
        deleted_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("profile_links", { prf_profile_id: 1, prf_link_order: 1 }, { name: "ix_prf_link_profile_order" });
  ensureIndex("profile_links", { prf_profile_id: 1, created_at: -1 }, { name: "ix_prf_link_profile_date" });

  // profile_prefs
  ensureCollection("profile_prefs", {
    validationLevel: "moderate",
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["prf_pref_id","prf_profile_id"],
      properties: {
        prf_pref_id: { bsonType: "string" },
        prf_profile_id: { bsonType: "string" },
        prf_privacy_level: { enum: ["public","followers","private"] },
        prf_dm_opt_in: { bsonType: ["bool","null"] },
        prf_email_opt_in: { bsonType: ["bool","null"] },
        prf_moderation_flags: { bsonType: ["array","null"], items: { bsonType: "string", maxLength: 64 }, maxItems: 20 },
        status_code: { enum: ["active","archived","deleted"] },
        status_date: { bsonType: ["date","null"] },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] },
        created_by: { bsonType: ["string","null"] },
        updated_by: { bsonType: ["string","null"] },
        deleted_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("profile_prefs", { prf_profile_id: 1 }, { name: "ux_prf_prefs_profile", unique: true });

  // ---------------------------
  // POST DOMAIN
  // ---------------------------
  ensureCollection("posts", {
    validationLevel: "moderate",
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["pst_post_id","usr_user_id","prf_profile_id","pst_type","status_code"],
      properties: {
        pst_post_id: { bsonType: "string" },
        usr_user_id: { bsonType: "string" },
        prf_profile_id: { bsonType: "string" },
        pst_type: { enum: ["text","image","video","link","poll"] },
        pst_subtype: { bsonType: ["string","null"], maxLength: 64 },
        pst_title: { bsonType: ["string","null"], maxLength: 160 },
        pst_body: { bsonType: ["string","null"], maxLength: 20000 },
        pst_canonical_url: { bsonType: ["string","null"], maxLength: 512 },
        pst_tags: { bsonType: ["array","null"], items: { bsonType: "string" }, maxItems: 20 },
        pst_published_at: { bsonType: ["date","null"] },
        pst_is_pinned: { bsonType: ["bool","null"] },
        pst_visibility: { enum: ["public","followers","private"] },
        pst_attachments_count: { bsonType: ["int","long","double","decimal","null"], minimum: 0 },
        status_code: { enum: ["draft","queued","published","moderation","deleted"] },
        status_date: { bsonType: ["date","null"] },
        deleted_at: { bsonType: ["date","null"] },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] },
        created_by: { bsonType: ["string","null"] },
        updated_by: { bsonType: ["string","null"] }
      }
    }}
  });
  ensureIndex("posts", { usr_user_id: 1, created_at: -1 }, { name: "ix_pst_author_date" });
  ensureIndex("posts", { pst_visibility: 1, created_at: -1 }, { name: "ix_pst_visibility_date" });
  ensureIndex("posts", { pst_type: 1, created_at: -1 }, { name: "ix_pst_type_date" });
  ensureIndex("posts", { pst_canonical_url: 1 }, { name: "ux_pst_canonical_url", unique: true, partialFilterExpression: { pst_canonical_url: { $type: "string" } } });

  // post_attachments
  ensureCollection("post_attachments", {
    validationLevel: "moderate",
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["pst_att_id","pst_post_id","pst_att_type","pst_att_url"],
      properties: {
        pst_att_id: { bsonType: "string" },
        pst_post_id: { bsonType: "string" },
        pst_att_type: { enum: ["image","video","file"] },
        pst_att_url: { bsonType: "string", maxLength: 2048, pattern: "^(https?://).+" },
        pst_att_metadata: { bsonType: ["object","null"] },
        pst_att_order: { bsonType: ["int","long","double","decimal","null"], minimum: 0 },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] },
        deleted_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("post_attachments", { pst_post_id: 1, pst_att_order: 1 }, { name: "ix_pst_att_post_order" });

  // post_audiences - Updated to match data dictionary exactly
  ensureCollection("post_audiences", {
    validationLevel: "moderate",
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["pst_aud_id","pst_post_id","pst_aud_scope"],
      properties: {
        pst_aud_id: { bsonType: "string" },
        pst_post_id: { bsonType: "string" },
        pst_aud_scope: { enum: ["all","followers","list","segment"] },
        pst_aud_list_id: { bsonType: ["string","null"] },
        pst_aud_segment_expr: { bsonType: ["string","null"], maxLength: 2000 },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("post_audiences", { pst_post_id: 1 }, { name: "ix_pst_aud_post" });

  // post_moderation - As per data dictionary (not post_moderation_logs)
  ensureCollection("post_moderation", {
    validationLevel: "moderate",
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["pst_mod_id","pst_post_id","pst_mod_state","pst_mod_actor"],
      properties: {
        pst_mod_id: { bsonType: "string" },
        pst_post_id: { bsonType: "string" },
        pst_mod_state: { enum: ["pending","approved","rejected","flagged"] },
        pst_mod_reason: { bsonType: ["string","null"], maxLength: 2000 },
        pst_mod_actor: { bsonType: "string" },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("post_moderation", { pst_post_id: 1, created_at: -1 }, { name: "ix_pst_mod_post_date" });

  // post_comments - Updated field names to match dictionary
  ensureCollection("post_comments", {
    validationLevel: "moderate",
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["pst_cmt_id","pst_post_id","usr_user_id","pst_cmt_body","status_code"],
      properties: {
        pst_cmt_id: { bsonType: "string" },
        pst_post_id: { bsonType: "string" },
        usr_user_id: { bsonType: "string" },
        prf_profile_id: { bsonType: ["string","null"] },
        pst_cmt_parent_id: { bsonType: ["string","null"] },
        pst_cmt_body: { bsonType: "string", minLength: 1, maxLength: 8000 },
        pst_cmt_visibility: { enum: ["public","followers","private"] },
        status_code: { enum: ["active","hidden","deleted","moderation"] },
        status_date: { bsonType: ["date","null"] },
        deleted_at: { bsonType: ["date","null"] },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("post_comments", { pst_post_id: 1, created_at: -1 }, { name: "ix_pst_cmt_post_date" });
  ensureIndex("post_comments", { pst_cmt_parent_id: 1, created_at: 1 }, { name: "ix_pst_cmt_parent_thread" });
  ensureIndex("post_comments", { status_code: 1, created_at: -1 }, { name: "ix_pst_cmt_status_date" });

  // post_reactions - Updated field names to match dictionary
  ensureCollection("post_reactions", {
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["pst_rct_id","pst_post_id","usr_user_id","pst_rct_type"],
      properties: {
        pst_rct_id: { bsonType: "string" },
        pst_post_id: { bsonType: "string" },
        usr_user_id: { bsonType: "string" },
        prf_profile_id: { bsonType: ["string","null"] },
        pst_rct_type: { enum: ["like","love","insightful","funny","angry","sad","custom"] },
        rct_payload: { bsonType: ["object","null"] },
        created_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("post_reactions", { pst_post_id: 1, pst_rct_type: 1 }, { name: "ix_pst_rct_post_type" });
  ensureIndex("post_reactions", { pst_post_id: 1, usr_user_id: 1, pst_rct_type: 1 }, { name: "ux_pst_rct_unique_user_type", unique: true });

  // post_bookmarks - Updated field names to match dictionary
  ensureCollection("post_bookmarks", {
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["pst_bkm_id","pst_post_id","usr_user_id"],
      properties: {
        pst_bkm_id: { bsonType: "string" },
        pst_post_id: { bsonType: "string" },
        usr_user_id: { bsonType: "string" },
        created_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("post_bookmarks", { usr_user_id: 1, created_at: -1 }, { name: "ix_pst_bkm_user_date" });
  ensureIndex("post_bookmarks", { pst_post_id: 1, usr_user_id: 1 }, { name: "ux_pst_bkm_unique", unique: true });

  // post_shares - Updated field names to match dictionary
  ensureCollection("post_shares", {
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["pst_shr_id","pst_post_id","usr_user_id","pst_shr_channel"],
      properties: {
        pst_shr_id: { bsonType: "string" },
        pst_post_id: { bsonType: "string" },
        usr_user_id: { bsonType: "string" },
        pst_shr_channel: { enum: ["inapp","link","email","sms","social"] },
        shr_payload: { bsonType: ["object","null"] },
        created_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("post_shares", { pst_post_id: 1, pst_shr_channel: 1, created_at: -1 }, { name: "ix_pst_shr_post_channel_date" });

  // post_views - Updated field names to match dictionary
  ensureCollection("post_views", {
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["pst_vw_id","pst_post_id"],
      properties: {
        pst_vw_id: { bsonType: "string" },
        pst_post_id: { bsonType: "string" },
        usr_user_id: { bsonType: ["string","null"] },
        prf_profile_id: { bsonType: ["string","null"] },
        vw_iphash: { bsonType: ["string","null"], maxLength: 128 },
        vw_user_agent: { bsonType: ["string","null"], maxLength: 512 },
        created_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("post_views", { pst_post_id: 1, created_at: -1 }, { name: "ix_pst_vw_post_date" });

  // post_reports - Updated field names to match dictionary
  ensureCollection("post_reports", {
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["pst_rpt_id","pst_post_id","usr_reporter_id","rpt_reason"],
      properties: {
        pst_rpt_id: { bsonType: "string" },
        pst_post_id: { bsonType: "string" },
        usr_reporter_id: { bsonType: "string" },
        rpt_reason: { enum: ["spam","abuse","nsfw","misinfo","other"] },
        rpt_note: { bsonType: ["string","null"], maxLength: 2000 },
        status_code: { enum: ["open","reviewing","resolved","dismissed"] },
        status_date: { bsonType: ["date","null"] },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("post_reports", { pst_post_id: 1, status_code: 1, created_at: -1 }, { name: "ix_pst_rpt_post_status_date" });

  // post_metrics_daily
  ensureCollection("post_metrics_daily", {
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["pst_pmd_id","pst_post_id","pmd_date"],
      properties: {
        pst_pmd_id: { bsonType: "string" },
        pst_post_id: { bsonType: "string" },
        pmd_date: { bsonType: "date" },
        pmd_views: { bsonType: ["int","long","double","decimal","null"], minimum: 0 },
        pmd_reactions: { bsonType: ["int","long","double","decimal","null"], minimum: 0 },
        pmd_comments: { bsonType: ["int","long","double","decimal","null"], minimum: 0 },
        pmd_shares: { bsonType: ["int","long","double","decimal","null"], minimum: 0 },
        pmd_bookmarks: { bsonType: ["int","long","double","decimal","null"], minimum: 0 },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("post_metrics_daily", { pst_post_id: 1, pmd_date: 1 }, { unique: true, name: "ux_pst_pmd_post_date" });

  // ---------------------------
  // CAMPAIGN DOMAIN
  // ---------------------------
  ensureCollection("campaigns", {
    validationLevel: "moderate",
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["cmp_campaign_id","usr_user_id","cmp_name","cmp_objective","cmp_channel","status_code"],
      properties: {
        cmp_campaign_id: { bsonType: "string" },
        usr_user_id: { bsonType: "string" },
        cmp_name: { bsonType: "string", maxLength: 120 },
        cmp_description: { bsonType: ["string","null"], maxLength: 2000 },
        cmp_objective: { enum: ["awareness","engagement","activation","conversion"] },
        cmp_channel: { bsonType: "array", items: { enum: ["inapp","email","sms","push","social"] } },
        cmp_start_at: { bsonType: ["date","null"] },
        cmp_end_at: { bsonType: ["date","null"] },
        cmp_timezone: { bsonType: ["string","null"] },
        cmp_budget_cents: { bsonType: ["int","long","double","decimal","null"], minimum: 0 },
        cmp_rate_limit_per_min: { bsonType: ["int","long","double","decimal","null"], minimum: 0 },
        cmp_template_id: { bsonType: ["string","null"] },
        cmp_metrics_snapshot: { bsonType: ["object","null"] },
        status_code: { enum: ["draft","scheduled","active","paused","completed","failed","deleted"] },
        status_date: { bsonType: ["date","null"] },
        deleted_at: { bsonType: ["date","null"] },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] },
        created_by: { bsonType: ["string","null"] },
        updated_by: { bsonType: ["string","null"] }
      }
    }}
  });
  ensureIndex("campaigns", { usr_user_id: 1, created_at: -1 }, { name: "ix_cmp_owner_date" });
  ensureIndex("campaigns", { status_code: 1, status_date: -1 }, { name: "ix_cmp_status_date" });

  // campaign_audiences - Updated to match dictionary structure  
  ensureCollection("campaign_audiences", {
    validationLevel: "moderate",
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["cmp_aud_id","cmp_campaign_id"],
      properties: {
        cmp_aud_id: { bsonType: "string" },
        cmp_campaign_id: { bsonType: "string" },
        // Keep flexible for now - dictionary doesn't fully specify structure
        audience_config: { bsonType: ["object","null"] },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("campaign_audiences", { cmp_campaign_id: 1 }, { name: "ix_cmp_aud_campaign" });

  // Add missing campaign collections mentioned in dictionary
  ensureCollection("campaign_jobs", {
    validationLevel: "moderate",
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["cmp_job_id","cmp_campaign_id","status_code"],
      properties: {
        cmp_job_id: { bsonType: "string" },
        cmp_campaign_id: { bsonType: "string" },
        cmp_job_type: { bsonType: ["string","null"] },
        cmp_job_config: { bsonType: ["object","null"] },
        scheduled_at: { bsonType: ["date","null"] },
        executed_at: { bsonType: ["date","null"] },
        status_code: { enum: ["pending","running","completed","failed","canceled"] },
        status_date: { bsonType: ["date","null"] },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("campaign_jobs", { cmp_campaign_id: 1, scheduled_at: 1 }, { name: "ix_cmp_job_campaign_schedule" });

  ensureCollection("campaign_templates", {
    validationLevel: "moderate", 
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["cmp_template_id","usr_user_id","template_name","status_code"],
      properties: {
        cmp_template_id: { bsonType: "string" },
        usr_user_id: { bsonType: "string" },
        template_name: { bsonType: "string", maxLength: 120 },
        template_content: { bsonType: ["object","null"] },
        template_type: { bsonType: ["string","null"] },
        status_code: { enum: ["active","archived","deleted"] },
        status_date: { bsonType: ["date","null"] },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] },
        deleted_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("campaign_templates", { usr_user_id: 1, created_at: -1 }, { name: "ix_cmp_template_owner_date" });

  ensureCollection("campaign_events", {
    validationLevel: "moderate",
    validator: { $jsonSchema: {
      bsonType: "object", 
      required: ["cmp_event_id","cmp_campaign_id","event_type"],
      properties: {
        cmp_event_id: { bsonType: "string" },
        cmp_campaign_id: { bsonType: "string" },
        usr_user_id: { bsonType: ["string","null"] },
        event_type: { enum: ["delivery","open","click","bounce","unsubscribe"] },
        event_data: { bsonType: ["object","null"] },
        created_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("campaign_events", { cmp_campaign_id: 1, event_type: 1, created_at: -1 }, { name: "ix_cmp_event_campaign_type_date" });

  // ---------------------------
  // MISSION DOMAIN  
  // ---------------------------
  ensureCollection("missions", {
    validationLevel: "moderate",
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["msn_mission_id","usr_user_id","msn_name","msn_objective","status_code"],
      properties: {
        msn_mission_id: { bsonType: "string" },
        usr_user_id: { bsonType: "string" },
        msn_name: { bsonType: "string", maxLength: 120 },
        msn_description: { bsonType: ["string","null"], maxLength: 4000 },
        msn_objective: { enum: ["learn","build","sell","engage","custom"] },
        msn_visibility: { enum: ["public","team","private"] },
        msn_estimated_minutes: { bsonType: ["int","long","double","decimal","null"], minimum: 1 },
        msn_prereq_mission_id: { bsonType: ["string","null"] },
        status_code: { enum: ["draft","active","paused","archived","deleted"] },
        status_date: { bsonType: ["date","null"] },
        deleted_at: { bsonType: ["date","null"] },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] },
        created_by: { bsonType: ["string","null"] },
        updated_by: { bsonType: ["string","null"] }
      }
    }}
  });
  ensureIndex("missions", { usr_user_id: 1, created_at: -1 }, { name: "ix_msn_owner_date" });

  // mission_steps - Updated field names to match dictionary
  ensureCollection("mission_steps", {
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["msn_step_id","msn_mission_id","msn_step_order","msn_step_type","msn_step_title"],
      properties: {
        msn_step_id: { bsonType: "string" },
        msn_mission_id: { bsonType: "string" },
        msn_step_order: { bsonType: "int", minimum: 1 },
        msn_step_type: { enum: ["read","watch","quiz","build","post","review"] },
        msn_step_title: { bsonType: "string", maxLength: 160 },
        msn_step_body: { bsonType: ["string","null"], maxLength: 10000 },
        msn_step_payload: { bsonType: ["object","null"] }
      }
    }}
  });
  ensureIndex("mission_steps", { msn_mission_id: 1, msn_step_order: 1 }, { unique: true, name: "ux_msn_step_order" });

  // mission_assignments - Updated field names to match dictionary
  ensureCollection("mission_assignments", {
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["msn_asg_id","msn_mission_id","usr_user_id","status_code"],
      properties: {
        msn_asg_id: { bsonType: "string" },
        msn_mission_id: { bsonType: "string" },
        usr_user_id: { bsonType: "string" },
        msn_asg_due_at: { bsonType: ["date","null"] },
        msn_asg_started_at: { bsonType: ["date","null"] },
        msn_asg_completed_at: { bsonType: ["date","null"] },
        status_code: { enum: ["assigned","in_progress","completed","expired","canceled"] },
        status_date: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("mission_assignments", { msn_mission_id: 1, usr_user_id: 1 }, { unique: true, name: "ux_msn_asg_unique" });
  ensureIndex("mission_assignments", { status_code: 1, msn_asg_due_at: 1 }, { name: "ix_msn_asg_status_due" });

  // mission_progress - Missing collection from data dictionary
  ensureCollection("mission_progress", {
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["msn_progress_id","msn_assignment_id","msn_step_id"],
      properties: {
        msn_progress_id: { bsonType: "string" },
        msn_assignment_id: { bsonType: "string" },
        msn_step_id: { bsonType: "string" },
        progress_status: { enum: ["not_started","in_progress","completed","skipped"] },
        progress_data: { bsonType: ["object","null"] },
        completed_at: { bsonType: ["date","null"] },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("mission_progress", { msn_assignment_id: 1, msn_step_id: 1 }, { unique: true, name: "ux_msn_progress_assignment_step" });

  // mission_assets - Missing collection from data dictionary
  ensureCollection("mission_assets", {
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["msn_asset_id","msn_mission_id","asset_type","asset_url"],
      properties: {
        msn_asset_id: { bsonType: "string" },
        msn_mission_id: { bsonType: "string" },
        msn_step_id: { bsonType: ["string","null"] },
        asset_type: { enum: ["document","video","image","link","file"] },
        asset_url: { bsonType: "string", maxLength: 2048 },
        asset_title: { bsonType: ["string","null"], maxLength: 160 },
        asset_metadata: { bsonType: ["object","null"] },
        status_code: { enum: ["active","archived","deleted"] },
        status_date: { bsonType: ["date","null"] },
        created_at: { bsonType: ["date","null"] },
        updated_at: { bsonType: ["date","null"] },
        deleted_at: { bsonType: ["date","null"] }
      }
    }}
  });
  ensureIndex("mission_assets", { msn_mission_id: 1, created_at: -1 }, { name: "ix_msn_asset_mission_date" });
  
  // ---------------------------
  // VERSION RECORD (non-destructive)
  // ---------------------------
  ensureCollection("schema_versions", {
    validator: { $jsonSchema: {
      bsonType: "object",
      required: ["version","applied_at"],
      properties: {
        version: { bsonType: "string" },
        applied_at: { bsonType: "date" },
        notes: { bsonType: ["string","null"] }
      }
    }}
  });
  ensureIndex("schema_versions", { version: 1 }, { name: "ux_schema_version", unique: true });

  const existing = db.schema_versions.findOne({ version: VERSION });
  if (!existing) {
    db.schema_versions.insertOne({ 
      version: VERSION, 
      applied_at: new Date(), 
      notes: "Dictionary-aligned schema with all required collections and correct field names." 
    });
    log("recorded schema version", VERSION);
  } else {
    log("schema_versions already has", VERSION);
  }

  log("✅ mongodb_schema_v2_aligned applied/reconciled - now matches data dictionary exactly.");
})();