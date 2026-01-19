'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from '@/components/ui/DataTable';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination';
import { PlusIcon, PencilSquareIcon, TrashIcon, UserCircleIcon, EyeIcon } from '@heroicons/react/24/outline';
import { DoctorForm } from '@/components/doctors/DoctorForm';

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modal, setModal] = useState({ isOpen: false, mode: 'add', data: null as any });

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/doctors');
            setDoctors(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDoctors(); }, []);

    const filteredDoctors = doctors.filter((doc: any) =>
        `${doc.firstName} ${doc.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.department?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleFormSubmit = async (formData: any) => {
        setIsSubmitting(true);
        try {
            if (modal.mode === 'edit') {
                await axios.put(`/api/users/${modal.data._id}`, formData);
            } else {
                await axios.post('/api/doctors', formData);
            }
            setModal({ ...modal, isOpen: false });
            fetchDoctors();
        } catch (error: any) {
            alert(error.response?.data?.error || "Action failed");
        } finally {
            setIsSubmitting(false); 
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to remove this doctor?")) {
            try {
                await axios.delete(`/api/users/${id}`);
                fetchDoctors();
            } catch (err) {
                alert("Failed to delete doctor");
            }
        }
    };

    const columns = [
        {
            header: "Doctor Details",
            accessor: (doc: any) => (
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                        <UserCircleIcon className="size-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white leading-none">
                            {doc.firstName} {doc.lastName}
                        </span>
                        <span className="text-[11px] text-slate-500 mt-1">{doc.email}</span>
                    </div>
                </div>
            )
        },
        {
            header: "Number",
            accessor: (doc: any) => (
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {doc.phone || 'N/A'}
                </span>
            )
        },
        {
            header: "Department",
            accessor: (doc: any) => (
                <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
                    {doc.department || 'General'}
                </span>
            )
        },
        {
            header: "Status",
            accessor: (doc: any) => (
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${doc.status === 'Active' ? 'bg-green-50 text-green-600 dark:bg-green-900/20' : 'bg-red-50 text-red-600 dark:bg-red-900/20'
                    }`}>
                    {doc.status || 'Active'}
                </span>
            )
        },
        {
            header: "Actions",
            accessor: (doc: any) => (
                <div className="flex gap-2">
                    <button onClick={() => setModal({ isOpen: true, mode: 'view', data: doc })} className="p-2 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg text-blue-600 transition-colors">
                        <EyeIcon className="size-5" />
                    </button>
                    <button onClick={() => setModal({ isOpen: true, mode: 'edit', data: doc })} className="p-2 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg text-blue-600 transition-colors">
                        <PencilSquareIcon className="size-5" />
                    </button>
                    <button onClick={() => handleDelete(doc._id)} className="p-2 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg text-red-600 transition-colors">
                        <TrashIcon className="size-5" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="p-6 font-outfit min-h-screen bg-white dark:bg-slate-950 transition-colors">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Doctors Directory</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Manage medical staff and their availability.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="w-full md:w-64">
                        <Input
                            label=""
                            placeholder="Search doctor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="!py-2.5"
                        />
                    </div>
                    <button
                        onClick={() => setModal({ isOpen: true, mode: 'add', data: null })}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-100 dark:shadow-none whitespace-nowrap"
                    >
                        <PlusIcon className="size-5" /> Add Doctor
                    </button>
                </div>
            </div>

            <DataTable columns={columns} data={filteredDoctors} isLoading={loading} />

            <Pagination currentPage={1} totalPages={1} onPageChange={() => { }} />

            <Modal
                isOpen={modal.isOpen}
                onClose={() => setModal({ ...modal, isOpen: false })}
                title={`${modal.mode === 'add' ? 'Add New' : 'Edit'} Doctor`}
            >
                <DoctorForm
                    initialData={modal.data}
                    onSubmit={handleFormSubmit}
                    isLoading={isSubmitting}
                    mode={modal.mode}
                />
            </Modal>
        </div>
    );
}