export class AccessDeniedError extends Error {
  constructor () {
    super('Acesso Negado')
    this.name = 'AccessDeniedError'
  }
}
