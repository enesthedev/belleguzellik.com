type Timestamps = {
    created_at: string;
    updated_at: string;
};

export type User = Timestamps & {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    two_factor_confirmed_at?: string | null;
};

export type Comment = Timestamps & {
    id: number;
    author: string;
    content: string;
    rating: number;
    is_active: boolean;
    avatar_url: string | null;
};

export type Service = Timestamps & {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    content: string | null;
    duration: number;
    image_url: string | null;
};

export type TemporaryUpload = Timestamps & {
    id: number;
    session_key: string;
};
