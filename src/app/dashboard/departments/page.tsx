'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { PlusIcon, BuildingOffice2Icon, PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { DepartmentForm } from '@/components/departments/DepartmentForms';

export default function DepartmentsPage() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ isOpen: false, mode: 'add', data: null as any });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchDepts = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/departments');
            setDepartments(res.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDepts(); }, []);

    const handleSubmit = async (formData: any) => {
        const modalId = modal.data?._id || modal.data?.id;
        setIsSubmitting(true);

        try {
            if (modalId && modal.mode === 'edit') {
                await axios.put(`/api/departments?id=${modalId}`, formData);
            } else {
                await axios.post('/api/departments', formData);
            }
            setModal({ ...modal, isOpen: false });
            fetchDepts();
        } catch (err) {
            alert("Action failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to remove this department?")) {
            try {
                await axios.delete(`/api/departments?id=${id}`);
                fetchDepts();
            } catch (err) {
                alert("Error deleting department");
            }
        }
    };

    const columns = [
        {
            header: "Department Name",
            accessor: (dept: any) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                        <BuildingOffice2Icon className="size-5" />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">{dept.name}</span>
                </div>
            )
        },
        { header: "H.O.D", accessor: (dept: any) => dept.headOfDepartment || 'Not Assigned' },
        {
            header: "Status",
            accessor: (dept: any) => (
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${dept.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                    {dept.status}
                </span>
            )
        },
        {
            header: "Actions",
            accessor: (dept: any) => (
                <div className="flex gap-2">
                    <button onClick={() => setModal({ isOpen: true, mode: "view", data: dept })} className="text-blue-600 p-1.5 hover:bg-blue-50 rounded-lg"><EyeIcon className="size-5" /></button>
                    <button onClick={() => setModal({ isOpen: true, mode: 'edit', data: dept })} className="text-blue-600 p-1.5 hover:bg-blue-50 rounded-lg"><PencilSquareIcon className="size-5" /></button>
                    <button onClick={() => handleDelete(dept._id)} className="text-red-600 p-1.5 hover:bg-red-50 rounded-lg"><TrashIcon className="size-5" /></button>
                </div>
            )
        }
    ];

    return (
        <div className="p-6 font-outfit">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white">Hospital Departments</h1>
                    <p className="text-sm text-slate-500">Manage medical divisions and staff assignments.</p>
                </div>
                <Button onClick={() => setModal({ isOpen: true, mode: 'add', data: null })} className="flex items-center gap-2">
                    <PlusIcon className="size-5" /> Add Department
                </Button>
            </div>

            <DataTable columns={columns} data={departments} isLoading={loading} />

            <Modal isOpen={modal.isOpen} onClose={() => setModal({ ...modal, isOpen: false })} title="Add New Department">
                <DepartmentForm
                    onSubmit={async (data) => {
                        handleSubmit(data);
                    }}
                    initialData={modal.data}
                    mode={modal.mode}
                    isLoading={isSubmitting}
                />
            </Modal>
        </div>
    );
}