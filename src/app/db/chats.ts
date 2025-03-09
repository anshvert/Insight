import { supabase } from '@/lib/supabase';

export async function createChat(user_email: string, message: string, isBot = false, chat_name = 'Insight') {
    const { data, error } = await supabase
        .from('Chats')
        .insert([{ user_email: user_email, message, is_bot: isBot, chat_name: chat_name }])
        .select()

    if (error) throw new Error(error.message);
    return data
}

export async function createBulkChats(chats: { user_email: string, message: string, isBot: boolean, chat_name?: string }[]) {
    if (!Array.isArray(chats) || chats.length === 0) {
        throw new Error('Chats parameter must be a non-empty array')
    }
    const formattedChats = chats.map(chat => ({
        user_email: chat.user_email,
        message: chat.message,
        is_bot: chat.isBot ?? false,
        chat_name: chat.chat_name ?? 'Insight',
    }))

    const { data, error } = await supabase
        .from('Chats')
        .insert(formattedChats)
        .select()

    if (error) throw new Error(error.message);
    return data
}

export async function getChats(user_email: string) {
    const { data, error } = await supabase
        .from('Chats')
        .select('*')
        .eq('user_email', user_email)
        .order('created_at', { ascending: true })

    if (error) throw new Error(error.message);
    return data
}