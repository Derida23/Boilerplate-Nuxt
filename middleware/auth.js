const auth = async ({ app, route, redirect, store }) => {
  const publish =
    (route?.name || '').includes('auth') || (route?.name || '') === 'index'
  const auth = (route?.name || '').includes('home')
  const token = app.$cookiz.get('x-csrf-token')

  if (auth) {
    if (!token) {
      return redirect('/')
    }
  }

  if (publish) {
    if (token) {
      const user = await store.dispatch('session/user')

      if (user) {
        return redirect('/home')
      }
    }
  }
}
export default auth
