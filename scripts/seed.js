import 'dotenv/config';
import mongoose from 'mongoose';
import { randomUUID as uuid } from 'crypto';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/5thsocial';
const db = await mongoose.connect(uri);
const profiles = db.connection.collection('profiles');
const posts = db.connection.collection('posts');
try {
    // Create initial profile and post
    const prfId = uuid();
    await profiles.insertOne({
        prf_profile_id: prfId,
        usr_user_id: uuid(),
        prf_handle: 'grego',
        prf_display_name: 'Greg O',
        prf_visibility: 'public',
        status_code: 'active',
        created_at: new Date(),
        updated_at: new Date()
    });
    await posts.insertOne({
        pst_post_id: uuid(),
        usr_user_id: uuid(),
        prf_profile_id: prfId,
        pst_type: 'text',
        pst_title: 'Hello 5thSocial',
        pst_body: 'MVP seed post',
        pst_visibility: 'public',
        status_code: 'draft',
        created_at: new Date(),
        updated_at: new Date()
    });
    console.log('Seeded profile + draft post.');
    // Load fixtures from JSON file if it exists
    const fixPath = path.resolve('fixtures/sample.json');
    if (fs.existsSync(fixPath)) {
        const data = JSON.parse(fs.readFileSync(fixPath, 'utf-8'));
        for (const p of data.profiles || []) {
            await profiles.insertOne({
                ...p,
                created_at: new Date(),
                updated_at: new Date()
            });
        }
        for (const p of data.posts || []) {
            await posts.insertOne({
                ...p,
                created_at: new Date(),
                updated_at: new Date()
            });
        }
        console.log('Loaded fixtures from fixtures/sample.json');
    }
    // Load bulk posts from compressed NDJSON file
    try {
        const bulkPath = 'fixtures/bulk_seed_posts.ndjson.gz';
        if (fs.existsSync(bulkPath)) {
            const gz = fs.readFileSync(bulkPath);
            const raw = zlib.gunzipSync(gz).toString('utf-8');
            const lines = raw.split('\n').filter(Boolean).slice(0, 2000); // safety cap
            for (const ln of lines) {
                const doc = JSON.parse(ln);
                await posts.insertOne({
                    ...doc,
                    created_at: new Date(),
                    updated_at: new Date()
                });
            }
            console.log(`Loaded ${lines.length} posts from bulk_seed_posts.ndjson.gz`);
        }
    }
    catch (e) {
        console.warn('Bulk seed load skipped:', e?.message || e);
    }
    console.log('Seeding completed successfully.');
}
catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
}
finally {
    await db.disconnect();
    process.exit(0);
}
