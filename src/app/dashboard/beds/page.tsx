'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { 
    PlusIcon, 
    Squares2X2Icon, 
    ListBulletIcon,
    BoltIcon, // ICU ke liye
    CloudIcon, // Ventilator ke liye
    ExclamationTriangleIcon, // Emergency ke liye
    HomeIcon // General ke liye
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

// Bed configurations for different types
const TYPE_CONFIG: any = {
    ICU: {
        icon: BoltIcon,
        color: 'from-purple-500 to-indigo-600',
        bg: 'bg-purple-50 dark:bg-purple-900/10',
        border: 'border-purple-200 dark:border-purple-800/50',
        text: 'text-purple-600 dark:text-purple-400'
    },
    Ventilator: {
        icon: CloudIcon,
        color: 'from-cyan-500 to-blue-600',
        bg: 'bg-cyan-50 dark:bg-cyan-900/10',
        border: 'border-cyan-200 dark:border-cyan-800/50',
        text: 'text-cyan-600 dark:text-cyan-400'
    },
    Emergency: {
        icon: ExclamationTriangleIcon,
        color: 'from-rose-500 to-red-600',
        bg: 'bg-rose-50 dark:bg-rose-900/10',
        border: 'border-rose-200 dark:border-rose-800/50',
        text: 'text-rose-600 dark:text-rose-400'
    },
    General: {
        icon: HomeIcon,
        color: 'from-emerald-500 to-teal-600',
        bg: 'bg-emerald-50 dark:bg-emerald-900/10',
        border: 'border-emerald-200 dark:border-emerald-800/50',
        text: 'text-emerald-600 dark:text-emerald-400'
    }
};

export default function BedAndICUPage() {
    const [beds, setBeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

    const [bulkData, setBulkData] = useState({
        prefix: 'BED',
        startNumber: 1,
        count: 10,
        type: 'General',
        department: 'General Ward'
    });

    const { user } = useSelector((state: any) => state.auth);

    const fetchBeds = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/beds');
            setBeds(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchBeds(); }, []);

    const handleBulkAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/beds/bulk', { 
        ...bulkData, 
        createdBy: user.id 
      });
      setIsModalOpen(false);
      fetchBeds();
    } catch (err) {
      alert("Error generating beds");
    }
  };

    return (
        <div className="p-6 font-outfit min-h-screen">
            {/* Header section code same rahega... */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Ward Inventory
                    </h1>
                    <p className="text-slate-500 font-medium">Monitoring {beds.length} active units across departments</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="rounded-2xl px-6 py-6 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20">
                    <PlusIcon className="size-5 mr-2" /> Bulk Generator
                </Button>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {beds.map((bed: any) => {
                    const config = TYPE_CONFIG[bed.type] || TYPE_CONFIG.General;
                    const Icon = config.icon;

                    return (
                        <div key={bed._id} className={`group relative p-6 rounded-[2.5rem] border-2 ${config.border} ${config.bg} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
                            
                            {/* Status Pill */}
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${config.color} text-white shadow-lg`}>
                                    <Icon className="size-6" />
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                    bed.status === 'Available' ? 'bg-white text-emerald-600' : 'bg-slate-900 text-white'
                                }`}>
                                    {bed.status}
                                </div>
                            </div>

                            {/* Bed Info */}
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">
                                    {bed.bedNumber}
                                </h3>
                                <p className={`text-xs font-bold uppercase tracking-widest ${config.text}`}>
                                    {bed.type} Unit
                                </p>
                            </div>

                            {/* Department Info */}
                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                    {bed.department}
                                </div>
                                
                                {/* Tiny Profile of creator */}
                                <div className="flex -space-x-2">
                                    <div className="size-7 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                        {bed.createdBy?.firstName?.charAt(0)}
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Background Element */}
                            <div className={`absolute -bottom-6 -right-6 size-24 rounded-full opacity-10 bg-gradient-to-br ${config.color} blur-2xl group-hover:opacity-20 transition-opacity`} />
                        </div>
                    );
                })}
            </div>

            {/* Modal same logic ke sath... */}
            {/* Bulk Add Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Bulk Bed Generator">
                <form onSubmit={handleBulkAdd} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Bed Prefix"
                            placeholder="e.g. ICU- or B-"
                            value={bulkData.prefix}
                            onChange={e => setBulkData({ ...bulkData, prefix: e.target.value })}
                        />
                        <Input
                            label="Start Number"
                            type="number"
                            value={bulkData.startNumber}
                            onChange={e => setBulkData({ ...bulkData, startNumber: Number(e.target.value) })}
                        />
                    </div>

                    <Input
                        label="Number of Beds to Create"
                        type="number"
                        value={bulkData.count}
                        onChange={e => setBulkData({ ...bulkData, count: Number(e.target.value) })}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Type"
                            isSelect
                            options={[
                                { value: 'General', label: 'General Bed' },
                                { value: 'ICU', label: 'ICU Bed' },
                                { value: 'Ventilator', label: 'Ventilator Bed' },
                                { value: 'Emergency', label: 'Emergency Bed' }
                            ]}
                            value={bulkData.type}
                            onChange={e => setBulkData({ ...bulkData, type: e.target.value })}
                        />
                        <Input
                            label="Department"
                            placeholder="e.g. Ward 1"
                            value={bulkData.department}
                            onChange={e => setBulkData({ ...bulkData, department: e.target.value })}
                        />
                    </div>

                    <Button type="submit" className="w-full py-4 mt-2 font-bold tracking-wide">
                        Generate {bulkData.count} {bulkData.type} Beds
                    </Button>
                </form>
            </Modal>
        </div>
    );
}