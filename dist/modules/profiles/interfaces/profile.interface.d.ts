import { Document } from 'mongoose';
export interface IProfile extends Document {
    prf_profile_id: string;
    usr_user_id: string;
    prf_handle: string;
    prf_display_name: string;
    prf_bio?: string;
    prf_avatar_url?: string;
    prf_banner_url?: string;
    prf_visibility: 'public' | 'followers' | 'private';
    prf_moderation_state: 'pending' | 'approved' | 'flagged' | 'removed';
    prf_moderation_reason?: string;
    dag_score: number;
    status_code: 'active' | 'hidden' | 'suspended' | 'deleted';
    status_date: Date;
    deleted_at?: Date;
    created_at: Date;
    updated_at: Date;
}
