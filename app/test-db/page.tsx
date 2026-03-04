import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function TestPage() {
  if (!supabase) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Database Test</h1>
        <p className="text-red-500">Supabase not configured</p>
      </div>
    )
  }

  const { data: skills, error } = await supabase
    .from('skills')
    .select('name, slug, created_at')
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Database Test</h1>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {skills && (
        <div>
          <p className="mb-4">Found {skills.length} skills:</p>
          <ul className="space-y-2">
            {skills.map((skill) => (
              <li key={skill.slug} className="border p-2 rounded">
                <strong>{skill.name}</strong>
                <br />
                <small className="text-gray-500">{skill.slug}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
