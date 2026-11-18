import type { Access, CollectionConfig, Where } from 'payload'
import { isAdmin } from '../access'
import { canReadResources } from './Resources'

/**
 * Files attached to Resources live here, NOT in the public Media library.
 *
 * They are stored in their own private bucket, and are only served by the CMS after this
 * check: a non-admin may read a file only if it is attached to a resource that user is
 * allowed to read (same rules as the Resources collection: public / mentor / mentee).
 * Files not attached to any resource are visible to admins only.
 */
const canReadFile: Access = async ({ req }) => {
  const { user, payload } = req
  if (user && (user as { role?: string }).role === 'admin') return true

  const resourceWhere = await canReadResources({ req })
  if (resourceWhere === false) return false

  const resources = await payload.find({
    collection: 'resources',
    where: resourceWhere === true ? undefined : (resourceWhere as Where),
    depth: 0,
    limit: 1000,
    pagination: false,
    overrideAccess: true, // the role rules are already applied through `where`
    select: { file: true },
  })

  const ids = resources.docs
    .map((r) => (typeof r.file === 'object' && r.file ? r.file.id : r.file))
    .filter((id): id is number => typeof id === 'number')

  return ids.length ? { id: { in: ids } } : false
}

export const ResourceFiles: CollectionConfig = {
  slug: 'resource-files',
  labels: { singular: 'Resource File', plural: 'Resource Files' },
  admin: {
    group: 'Mentorship Program',
    description:
      'Downloadable files for Resources. Who can download a file is decided by the Access Level of the resource it is attached to (public, mentor only, or mentee only).',
  },
  access: {
    read: canReadFile,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [],
  upload: true,
}
