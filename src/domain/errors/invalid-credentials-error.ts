export class InvalidCredentialsError extends Error {
  construtor () {
    super('Credenciais inválidas')
    this.name = 'InvalidCredentialError'
  }
}
