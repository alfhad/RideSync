export class ApiResponse<T> {
  constructor(
    data: T,
    code?: number,
    displayMessage?: string,
    errorMessage?: string
  ) {
    this.code = code || 200
    this.errorMessage = errorMessage || null
    this.displayMessage = displayMessage || ''
    this.data = data
  }

  code: number

  errorMessage: string | null

  displayMessage: string

  data: T
}

export class ApiResponseArray<T> {
  constructor(
    data: T[],
    totalCount: number,
    code?: number,
    displayMessage?: string,
    errorMessage?: string
  ) {
    this.code = code || 200
    this.errorMessage = errorMessage || null
    this.displayMessage = displayMessage || ''
    this.data = data
    this.totalCount = totalCount
  }

  code: number

  errorMessage: string | null

  displayMessage: string

  totalCount: number

  data: T[]
}