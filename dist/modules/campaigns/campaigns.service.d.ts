import { Model } from 'mongoose';
import { CampaignCreate, CampaignUpdate } from './campaign.dto.js';
import { CampaignsScheduler } from '../scheduler/scheduler.service.js';
import { JwtUser } from '../auth/jwt.strategy.js';
interface CampaignDocument {
    cmp_campaign_id: string;
    usr_user_id: string;
    cmp_name: string;
    cmp_description?: string;
    cmp_objective: string;
    cmp_channel: string[];
    cmp_start_at?: Date;
    cmp_end_at?: Date;
    cmp_timezone?: string;
    cmp_budget_cents?: number;
    cmp_rate_limit_per_min?: number;
    cmp_template_id?: string;
    cmp_metrics_snapshot?: object;
    status_code: string;
    status_date?: Date;
    deleted_at?: Date;
    created_at?: Date;
    updated_at?: Date;
    created_by?: string;
    updated_by?: string;
    save: () => Promise<CampaignDocument>;
    toObject: () => any;
}
export declare class CampaignsService {
    private model;
    private sched;
    constructor(model: Model<CampaignDocument>, sched: CampaignsScheduler);
    private checkOwnership;
    create(dto: CampaignCreate): Promise<CampaignDocument & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(user: JwtUser): Promise<(import("mongoose").FlattenMaps<{
        cmp_campaign_id: string;
        usr_user_id: string;
        cmp_name: string;
        cmp_description?: string | undefined;
        cmp_objective: string;
        cmp_channel: string[];
        cmp_start_at?: Date | undefined;
        cmp_end_at?: Date | undefined;
        cmp_timezone?: string | undefined;
        cmp_budget_cents?: number | undefined;
        cmp_rate_limit_per_min?: number | undefined;
        cmp_template_id?: string | undefined;
        cmp_metrics_snapshot?: object | undefined;
        status_code: string;
        status_date?: Date | undefined;
        deleted_at?: Date | undefined;
        created_at?: Date | undefined;
        updated_at?: Date | undefined;
        created_by?: string | undefined;
        updated_by?: string | undefined;
        save: () => Promise<CampaignDocument>;
        toObject: () => any;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string, user: JwtUser): Promise<(import("mongoose").FlattenMaps<{
        cmp_campaign_id: string;
        usr_user_id: string;
        cmp_name: string;
        cmp_description?: string | undefined;
        cmp_objective: string;
        cmp_channel: string[];
        cmp_start_at?: Date | undefined;
        cmp_end_at?: Date | undefined;
        cmp_timezone?: string | undefined;
        cmp_budget_cents?: number | undefined;
        cmp_rate_limit_per_min?: number | undefined;
        cmp_template_id?: string | undefined;
        cmp_metrics_snapshot?: object | undefined;
        status_code: string;
        status_date?: Date | undefined;
        deleted_at?: Date | undefined;
        created_at?: Date | undefined;
        updated_at?: Date | undefined;
        created_by?: string | undefined;
        updated_by?: string | undefined;
        save: () => Promise<CampaignDocument>;
        toObject: () => any;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id: string, dto: CampaignUpdate, user: JwtUser): Promise<(import("mongoose").FlattenMaps<{
        cmp_campaign_id: string;
        usr_user_id: string;
        cmp_name: string;
        cmp_description?: string | undefined;
        cmp_objective: string;
        cmp_channel: string[];
        cmp_start_at?: Date | undefined;
        cmp_end_at?: Date | undefined;
        cmp_timezone?: string | undefined;
        cmp_budget_cents?: number | undefined;
        cmp_rate_limit_per_min?: number | undefined;
        cmp_template_id?: string | undefined;
        cmp_metrics_snapshot?: object | undefined;
        status_code: string;
        status_date?: Date | undefined;
        deleted_at?: Date | undefined;
        created_at?: Date | undefined;
        updated_at?: Date | undefined;
        created_by?: string | undefined;
        updated_by?: string | undefined;
        save: () => Promise<CampaignDocument>;
        toObject: () => any;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    remove(id: string, user: JwtUser): Promise<(import("mongoose").FlattenMaps<{
        cmp_campaign_id: string;
        usr_user_id: string;
        cmp_name: string;
        cmp_description?: string | undefined;
        cmp_objective: string;
        cmp_channel: string[];
        cmp_start_at?: Date | undefined;
        cmp_end_at?: Date | undefined;
        cmp_timezone?: string | undefined;
        cmp_budget_cents?: number | undefined;
        cmp_rate_limit_per_min?: number | undefined;
        cmp_template_id?: string | undefined;
        cmp_metrics_snapshot?: object | undefined;
        status_code: string;
        status_date?: Date | undefined;
        deleted_at?: Date | undefined;
        created_at?: Date | undefined;
        updated_at?: Date | undefined;
        created_by?: string | undefined;
        updated_by?: string | undefined;
        save: () => Promise<CampaignDocument>;
        toObject: () => any;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    schedule(id: string, user: JwtUser): Promise<(CampaignDocument & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    activate(id: string, user: JwtUser): Promise<(CampaignDocument & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    pause(id: string, user: JwtUser): Promise<(CampaignDocument & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    finalize(id: string, user: JwtUser): Promise<(CampaignDocument & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
export {};
