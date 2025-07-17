'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Github, User, Lock } from 'lucide-react'
import { useState } from 'react'

const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(3, 'Minimum 3 characters'),
  password: yup.string().required('Password is required').min(8, 'Minimum 8 characters'),
})

type LoginFormData = yup.InferType<typeof loginSchema>

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')
    const result = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
    })

    if (result?.error) {
      setError('Invalid username or password')
    } else {
      router.push('/task')
    }
    setIsLoading(false)
  }

  const handleGithubLogin = () => {
    setIsLoading(true)
    signIn('github', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Task Manager</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to manage your tasks</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded">
                {error}
              </div>
            )}

            <div>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  {...register('username')}
                  placeholder="Username"
                  className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  {...register('password')}
                  placeholder="Password"
                  className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm text-gray-500 bg-white px-2">Or continue with</div>
            </div>

            <button
              onClick={handleGithubLogin}
              disabled={isLoading}
              className="mt-4 w-full flex justify-center items-center gap-2 border border-gray-300 rounded-md py-2 px-4 text-sm text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <Github className="h-5 w-5" />
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
