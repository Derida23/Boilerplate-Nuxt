const auth = async ({ app, route, redirect, store }) => {
  const publicRoute =
    (route?.name || '').includes('auth') || (route?.name || '') === 'index'
  const otpRoute = (route?.name || '').includes('otp')
  const privateRoute = (route?.name || '').includes('home')
  const token = app.$cookiz.get('x-csrf-token')

  if (privateRoute) {
    if (!token) {
      return redirect('/')
    }
  }

  if (publicRoute) {
    if (token) {
      const user = await store.dispatch('session/user')

      if (user) {
        return redirect('/home')
      }
    }

    if (otpRoute) {
      const otp = app.$cookiz.get('__OTP')
      if (!otp) {
        return redirect('/auth/register')
      }
    }
  }
}
export default auth
