import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { LoaderCircle } from 'lucide-react'
import { z } from 'zod'
import { useAuthStore } from '@/stores/AuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
})

type FormData = z.infer<typeof formSchema>

export function Login() {
  const navigate = useNavigate()
  const { setToken } = useAuthStore()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const [loading, setLoading] = useState(false)

  async function signIn(data: FormData) {
    try {
      setLoading(true)

      const { username, password } = data

      const loginResponse = await api.post('/login', {
        username,
        password
      })

      setToken(loginResponse.data.token)

      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-96 flex-1 flex-col justify-center gap-8">
      {/* <img src={LogoImage} alt="Mocha" className="w-10" /> */}

      <h1 className="text-xl font-semibold">Sign in</h1>

      <form
        onSubmit={form.handleSubmit(signIn)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="username">Usuário</Label>
          <Input id="username" placeholder="Email" {...form.register('username')} />
          {form.formState.errors.username?.message && (
            <span className="text-sm text-red-500">
              {form.formState.errors.username?.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" placeholder="Senha" {...form.register('password')} />
          {form.formState.errors.password?.message && (
            <span className="text-sm text-red-500">
              {form.formState.errors.password?.message}
            </span>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </div>
  )
}