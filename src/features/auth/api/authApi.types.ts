import type { LoginInputs } from "@/features/auth/lib/schemas"

export type LoginArgs = LoginInputs & {
  captcha?: string
}
