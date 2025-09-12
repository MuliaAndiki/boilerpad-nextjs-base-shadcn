import { z } from "zod";

export const requiredString = z.string().trim().min(1, "Required");

// export const filterTypeSchema = z
//   .record(
//     z.union([z.string(), z.number(), z.boolean(), z.null(), z.array(z.union([z.string(), z.number(), z.boolean()]))])
//   )
//   .optional()
// export const searchFilterTypeSchema = filterTypeSchema.optional()
// export const rangedFilterTypeSchema = z
//   .object({
//     key: z.string(),
//     start: z.number(),
//     end: z.number()
//   })
//   .array()
//   .optional()
export const pageFilterTypeSchema = z.number().optional();
export const rowsFilterTypeSchema = z.number().optional();
// export const orderKeyFilterTypeSchema = z.string().optional()
// export const orderRuleFilterTypeSchema = z.enum(['asc', 'desc']).optional()

export const queryParamsSchema = z.object({
    //   filters: filterTypeSchema,
    //   searchFilters: searchFilterTypeSchema,
    //   rangedFilters: rangedFilterTypeSchema,
    page: pageFilterTypeSchema,
    rows: rowsFilterTypeSchema,
    //   orderKey: orderKeyFilterTypeSchema,
    //   orderRule: orderRuleFilterTypeSchema
});

export type QueryParams = z.infer<typeof queryParamsSchema>;
