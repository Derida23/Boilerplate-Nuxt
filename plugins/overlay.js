export default function ({ store }, inject) {
  inject('overlay', (val) => {
    store.set('overlay', val)
  })
}
