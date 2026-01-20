'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
    PlusIcon,
    Squares2X2Icon,
    NoSymbolIcon,
    TrashIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { BedCard } from '@/components/beds/BedCard';
import { BedFilters } from '@/components/beds/BedFilters';

export default function BedAndICUPage() {
    const [beds, setBeds] = useState([]);
    const [filteredBeds, setFilteredBeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [selectedBeds, setSelectedBeds] = useState<string[]>([]);
    const [activeFilter, setActiveFilter] = useState('All');

    const [bulkData, setBulkData] = useState({
        prefix: 'B',
        startNumber: 1,
        count: 10,
        type: 'General',
        department: ''
    });

    const [clearDeptId, setClearDeptId] = useState('');
    const [departments, setDepartments] = useState([]);
    const { user } = useSelector((state: any) => state.auth);

    const fetchDepartments = async () => {
        try {
            const res = await axios.get('/api/departments');
            const options = res.data.map((dept: any) => ({
                value: dept._id,
                label: dept.name
            }));
            setDepartments(options);
        } catch (err) { console.error(err); }
    };

    const fetchBeds = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/beds');
            setBeds(res.data);
            setFilteredBeds(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        fetchDepartments();
        fetchBeds();
    }, []);

    useEffect(() => {
        setFilteredBeds(activeFilter === 'All' ? beds : beds.filter((b: any) => b.type === activeFilter));
    }, [activeFilter, beds]);

    const handleBulkAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/beds', { ...bulkData, createdBy: user?.id || user?._id });
            setIsModalOpen(false);
            fetchBeds();
        } catch (err) { alert("Generation failed!"); }
    };

    const handleClearDeptSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clearDeptId) return alert("Please select a department");

        try {
            await axios.delete(`/api/beds?department=${clearDeptId}`);
            setIsClearModalOpen(false);
            setClearDeptId('');
            fetchBeds();
        } catch (err) { alert("Clear operation failed"); }
    };

    const toggleSelectAll = () => {
        if (selectedBeds.length === filteredBeds.length) {
            setSelectedBeds([]);
        } else {
            setSelectedBeds(filteredBeds.map((b: any) => b._id));
        }
    };
    const handleBulkDelete = async () => {
        if (!confirm(`Delete ${selectedBeds.length} selected units?`)) return;
        try {
            await axios.delete(`/api/beds?ids=${selectedBeds.join(',')}`);
            setSelectedBeds([]);
            fetchBeds();
        } catch (err) { alert("Occupied beds cannot be removed!"); }
    };
    return (
        <div className="p-6 font-outfit min-h-screen bg-white dark:bg-slate-950">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight italic">WARD.OS</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Inventory Control</p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleSelectAll}
                        className={`p-2 rounded-xl border transition-all flex items-center gap-2 ${selectedBeds.length > 0 && selectedBeds.length === filteredBeds.length
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                            : 'bg-white border-slate-200 text-slate-400 hover:text-blue-600'
                            }`}
                    >
                        {selectedBeds.length > 0 && selectedBeds.length === filteredBeds.length ? <CheckCircleIcon className="size-4" /> : <Squares2X2Icon className="size-4" />}
                    </button>

                    <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase">
                        <PlusIcon className="size-4 mr-1.5" /> Bulk Generate
                    </Button>

                    <button
                        onClick={() => setIsClearModalOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all text-xs font-bold uppercase"
                    >
                        <NoSymbolIcon className="size-4" /> Clear Dept
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-8 bg-slate-50/50 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                <BedFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} beds={beds} />

                {selectedBeds.length > 0 && (
                    <button
                        onClick={handleBulkDelete}
                        className="flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-200 animate-in slide-in-from-right-4 transition-all hover:bg-rose-700"
                    >
                        <TrashIcon className="size-4" />
                        Delete ({selectedBeds.length})
                    </button>
                )}
            </div>

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-pulse">
                    {[...Array(12)].map((_, i) => <div key={i} className="h-40 bg-slate-50 rounded-3xl" />)}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {filteredBeds.map((bed: any) => (
                        <BedCard
                            key={bed._id}
                            bed={bed}
                            isSelected={selectedBeds.includes(bed._id)}
                            onSelect={(id: string) => setSelectedBeds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])}
                            onDelete={async (id: string, status: string) => {
                                if (status === 'Occupied') return alert("Occupied units cannot be removed!");
                                if (confirm("Remove this unit?")) { await axios.delete(`/api/beds?id=${id}`); fetchBeds(); }
                            }}
                            departments={departments}
                        />
                    ))}
                </div>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generate Multiple Beds">
                <form onSubmit={handleBulkAdd} className="space-y-4 p-2 font-outfit">
                    <div className="grid grid-cols-2 gap-3">
                        <Input required={true} label="Prefix" value={bulkData.prefix} onChange={e => setBulkData({ ...bulkData, prefix: e.target.value })} />
                        <Input required={true} label="Start #" type="number" value={bulkData.startNumber} onChange={e => setBulkData({ ...bulkData, startNumber: Number(e.target.value) })} />
                    </div>
                    <Input required={true} label="Units Count" type="number" value={bulkData.count} onChange={e => setBulkData({ ...bulkData, count: Number(e.target.value) })} />
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Type" required={true} isSelect options={[{ value: 'General', label: 'General' }, { value: 'ICU', label: 'ICU' }, { value: 'Ventilator', label: 'Ventilator' }, { value: 'Emergency', label: 'Emergency' }]} value={bulkData.type} onChange={e => setBulkData({ ...bulkData, type: e.target.value })} />
                        <Input label="Department" required={true} isSelect options={departments} value={bulkData.department} onChange={e => setBulkData({ ...bulkData, department: e.target.value })} placeholder="Select Dept" />
                    </div>
                    <Button type="submit" className="w-full py-4 mt-2 bg-blue-600 text-white text-xs font-black uppercase tracking-widest">Build Inventory</Button>
                </form>
            </Modal>

            <Modal isOpen={isClearModalOpen} onClose={() => setIsClearModalOpen(false)} title="Clear Department Inventory">
                <form onSubmit={handleClearDeptSubmit} className="space-y-6 p-2 font-outfit text-center">
                    <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 flex flex-col items-center">
                        <ExclamationTriangleIcon className="size-10 text-rose-500 mb-2" />
                        <p className="text-xs font-bold text-rose-800 uppercase tracking-tight">Danger Zone</p>
                        <p className="text-[11px] text-rose-600 mt-1">This will delete all available beds in the selected department.</p>
                    </div>

                    <Input
                        label="Select Department to Wipe"
                        isSelect
                        options={departments}
                        value={clearDeptId}
                        onChange={e => setClearDeptId(e.target.value)}
                        placeholder="Choose Department"
                        required={true}
                    />

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsClearModalOpen(false)}
                            className="flex-1 py-3.5 rounded-xl bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3.5 rounded-xl bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all"
                        >
                            Clear Now
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}