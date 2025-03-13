import { supabase } from '@/lib/supabase'

export async function addModel(name: string, isAvailable: boolean = true) {
    const { data, error } = await supabase
        .from('Models')
        .insert([{ name: name, isAvailable: isAvailable }])
        .select()
    if (error) throw error
    return data
}

export async function getModels() {
    const { data, error } = await supabase
        .from('Models')
        .select('name, display_name')
    if (error) throw error
    return data
}