import z from 'zod'
import { asApi } from '@zodios/core'

const user = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number().positive(),
  email: z.string().email(),
})

const GenericFontObject = z.object({
  id: z.number().positive(),
  name: z.string(),
  slug: z.string(),
  use_count: z.number().nonnegative(),
  permalink: z.string().url(),
})

const Tag = GenericFontObject.omit({ name: true })

const Format = GenericFontObject

const FontFamily = GenericFontObject.extend({
  kind: z.string(),
  sample_src: z.string(),
})

const Contributor = z.object({
  id: z.number(),
  slug: z.string(),
  username: z.string(),
  pretty_name: z.string(),
  first_name: z.optional(z.string()),
  surname: z.optional(z.string()),
  permalink: z.string(),
})

const webPUrl = z
  .string()
  .url()
  .transform((val) => val.replace('jpeg', 'webp'))

const Topic = GenericFontObject

export const use = z.object({
  id: z.number(),
  name: z.string(),
  contributor: Contributor,
  font_families: z.array(FontFamily),
  formats: z.array(Format),
  topics: z.array(Topic),
  industries: z.array(GenericFontObject),
  designers: z.array(GenericFontObject),
  tags: z.array(Tag),
  source_type: z.string(),
  locations: z.array(
    z.object({
      id: z.number(),
      latitude: z.optional(z.string()),
      longitude: z.optional(z.string()),
      name: z.string(),
      slug: z.string(),
      use_count: z.number().nonnegative(),
    })
  ),
  slug: z.string(),
  modified: z.string(),
  permalink: z.string(),
  thumb: webPUrl,
})

export const usesResults = z.object({
  count: z.number(),
  page_size: z.number(),
  uses: z.array(use),
})

export const usesResultsApi = asApi([
  {
    method: 'get',
    path: '/uses',
    alias: 'getUses',
    response: usesResults,
  },
])

export const userApi = asApi([
  {
    method: 'get',
    path: '/users',
    alias: 'getUsers',
    response: usesResults,
  },
  {
    method: 'get',
    path: '/users/:id',
    alias: 'getUser',
    response: user,
    errors: [
      {
        status: 'default',
        schema: z.object({
          error: z.object({
            code: z.number(),
            message: z.string(),
          }),
        }),
      },
    ],
  },
  {
    method: 'post',
    path: '/users',
    alias: 'createUser',
    parameters: [
      {
        name: 'user',
        type: 'Body',
        schema: user.omit({ id: true }),
      },
    ],
    response: user,
  },
])
