import { AuthApiError } from "@supabase/supabase-js";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
    register: async ({request, locals}) => {
        const body = Object.fromEntries(await request.formData())

        const {data, error: err} = await locals.sb.auth.signUp({
            email: body.email as string,
            password: body.password as string,
        })

        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return fail(400, {
                    error: "Invalid Email or Password"
                })
            }

            return fail(500, {
                error: "Issue with the Server. Please try again later."
            })
        }

        throw redirect(303, '/')
    }
};