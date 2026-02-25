import { ROLE_PERMISSIONS, Role } from '@/config/permissions';

export const checkPermission = (
    role: string | undefined,
    module: string,
    type: 'view' | 'add' | 'edit' | 'delete'
): boolean => {
    if (!role) return false;

    const userRole = role.toLowerCase() as Role;

    if (userRole === 'superadmin') return true;

    const normalizedModule = module.toLowerCase().replace(/\s/g, '').replace('&', '');

    const permissions = ROLE_PERMISSIONS[userRole]?.[normalizedModule];

    if (!permissions) return false;

    return permissions[type] || false;
};