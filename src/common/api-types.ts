import z from 'zod'
import { asApi } from '@zodios/core'

const GenericFontDataSet = z.object({
  count: z.number(),
  page_size: z.number().or(z.string().transform((val) => parseInt(val))),
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

export type FontFamily = z.infer<typeof FontFamily>

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

export const usesResults = GenericFontDataSet.extend({
  uses: z.array(use),
})

export type Use = z.infer<typeof use>

export const usesResultsApi = asApi([
  {
    method: 'get',
    path: '/uses',
    alias: 'getUses',
    response: usesResults,
  },
])

const GenericSubEntity = z.object({
  id: z.number(),
  principal: z.boolean(),
})

const designEntity = GenericSubEntity.extend({
  designed: z.optional(z.date().or(z.string())),
  designer: z.object({
    id: z.number(),
    name: z.string(),
    permalink: z.string().url(),
  }),
})

const foundryEntity = GenericSubEntity.extend({
  foundry: z.object({
    href: z.string().url(),
    id: z.number(),
    links: z.array(
      z.object({
        discr: z.string(),
        href: z.string().url(),
        id: z.number(),
        type: z.number(),
        typed_label: z.string(),
      })
    ),
    name: z.string(),
    permalink: z.string().url(),
  }),
})

export const detailedFamily = GenericFontObject.extend({
  description: z.optional(z.string()),
  designs: z.array(z.any()),
  foundry_type_entities: z.array(z.any()),
  info_links: z.array(z.any()),
  kind: z.string(),
  released: z.date().or(z.string()),
  released_circa: z.optional(z.boolean()),
  source_links: z.array(z.any()),
  styles: z.array(z.any()),
  vendor_type_entities: z.array(z.any()),
  sample_src: z.nullable(z.string().url()),
})

export const detailedFamilyResults = GenericFontDataSet.extend({
  type_entities: z.array(detailedFamily),
})

export const entity = GenericFontObject.extend({
  description: z.optional(z.string()),
  kind: z.string(),
  use_count: z.optional(z.number().nonnegative()),
  sample_src: z.nullable(z.string()),
})

export const entitiesResults = GenericFontDataSet.extend({
  type_entities: z.array(entity),
})

export const entitiesResultsApi = asApi([
  {
    method: 'get',
    path: '/entities',
    alias: 'getEntities',
    response: entitiesResults,
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
    response: use,
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
        schema: use.omit({ id: true }),
      },
    ],
    response: use,
  },
])
