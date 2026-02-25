import { checkPermission } from '@/lib/permissions';
import { useSelector } from 'react-redux';

export const useAuthPermissions = () => {
    const { user } = useSelector((state: any) => state.auth);

    return {
        can: (module: string, type: 'view' | 'add' | 'edit' | 'delete') => 
            checkPermission(user?.role, module, type),
        role: user?.role
    };
};