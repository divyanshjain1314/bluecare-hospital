'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Patient } from '@/data/patients';
import { EyeIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { RootState } from '@/store/store';
import { Badge } from '@/components/ui/Badge';
import { DataTable, Column } from '@/components/ui/DataTable';

import { Modal } from '@/components/ui/Modal';

import { PatientForm } from '@/components/Patients/PatientForm';

export default function PatientsPage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [isViewMode, setIsViewMode] = useState(false);

    const fetchPatients = async () => {
        try {
            const res = await axios.get<Patient[]>(`/api/patients?email=${user?.email}`);
            setPatients(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) fetchPatients();
    }, [user]);


    const columns: Column<Patient>[] = [
        {
            header: "Patient Name",
            accessor: (p) => (
                <div>
                    <div className="font-medium text-slate-900 dark:text-white">{p.name}</div>
                </div>
            )
        },
        { header: "Age/Gender", accessor: (p) => `${p.age}y / ${p.gender}` },
        { header: "Blood", accessor: "bloodGroup" },
        {
            header: "Status",
            accessor: (p) => (
                <Badge variant={p.status === 'Critical' ? 'rose' : 'emerald'}>
                    {p.status}
                </Badge>
            )
        },
        {
            header: "Actions",
            className: "text-right",
            accessor: (p) => (
                <div className="flex justify-end gap-2">
                    <button onClick={() => openViewModal(p)} className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"><EyeIcon className="size-5" /></button>
                    <button onClick={() => openEditModal(p)} className="p-1.5 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"><PencilIcon className="size-5" /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors">
                        <TrashIcon className="size-5" />
                    </button>
                </div>
            )
        }
    ];


    const handleDelete = async (patientId: string) => {
        try {
            await axios.delete(`/api/patients/${patientId}`);
            setPatients(prev => prev.filter(p => p.id !== patientId));
        } catch (err) {
            console.error(err);
        }
    };

    const openViewModal = (patient: Patient) => {
        setSelectedPatient(patient);
        setIsViewMode(true);
        setIsModalOpen(true);
    }

    const openAddModal = () => {
        setSelectedPatient(null);
        setIsModalOpen(true);
    };

    const openEditModal = (patient: Patient) => {
        setSelectedPatient(patient);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            if (selectedPatient) {
                console.log("Updating patient:", selectedPatient.id, data);
                await axios.put(`/api/patients/${selectedPatient.id}`, data);
            } else {
                await axios.post('/api/patients', { ...data, createdBy: user?.email });
            }
            setIsModalOpen(false);
            fetchPatients();
        } catch (error) {
            alert("Error saving data");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold font-outfit">My Patients</h1>
                <button onClick={openAddModal} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2">
                    <PlusIcon className="size-5" /> Add Patient
                </button>
            </div>

            <DataTable
                columns={columns}
                data={patients}
                isLoading={loading}
            />
            <Modal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setIsViewMode(false); }}
                title={isViewMode ? "View Patient" : selectedPatient ? "Edit Patient" : "Add New Patient"}
            >
                <PatientForm
                    initialData={selectedPatient}
                    onSubmit={handleFormSubmit}
                    isLoading={isSubmitting}
                    isView={isViewMode}
                />
            </Modal>
        </div>
    );
}
