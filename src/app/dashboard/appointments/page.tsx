'use client';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { PencilSquareIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Pagination } from '@/components/ui/Pagination';
import { Modal } from '@/components/ui/Modal';
import { AppointmentForm } from '@/components/appointments/AppointmentForm';
import moment from 'moment';
import { Input } from '@/components/ui/Input';

export default function AppointmentsPage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filterStatus, setFilterStatus] = useState('All');
    const [modalState, setModalState] = useState({
        isOpen: false,
        mode: 'add',
        data: {} as any
    });
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleFormSubmit = async (formData: any) => {
        setIsSubmitting(true);
        try {
            const appointmentId = modalState.data?._id || modalState.data?.id;

            if (modalState.mode === 'edit' && appointmentId) {
                await axios.put(`/api/appointments/${appointmentId}`, formData);
            } else {
                await axios.post('/api/appointments', {
                    ...formData,
                    doctorEmail: user?.email
                });
            }
            setModalState({ ...modalState, isOpen: false });
            fetchAppointments();
        } catch (error) {
            alert("Action failed");
        } finally {
            setIsSubmitting(false);
        }
    };
    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/appointments?email=${user?.email}&page=${page}&status=${filterStatus}`);
            setAppointments(res.data.data);
            setTotalPages(res.data.pagination.pages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (user?.email) fetchAppointments(); }, [page, filterStatus]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this appointment?")) return;
        try {
            await axios.delete(`/api/appointments/${id}`);
            fetchAppointments();
        } catch (error) {
            alert("Failed to delete");
        }
    };

    const columns = [
        {
            header: "Patient Name",
            accessor: (appt: any) => (
                <span className="font-bold text-slate-900 dark:text-slate-50">{appt.patientName}</span>
            )
        },
        {
            header: "Date & Time",
            accessor: (appt: any) => (
                <div className="flex flex-col">
                    <span className="font-medium">{moment(appt.date).format('DD MMM YYYY')}</span>
                    <span className="text-xs text-slate-400">{appt.time}</span>
                </div>
            )
        },
        {
            header: "Status",
            accessor: (appt: any) => (
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${appt.status === 'Scheduled' ? 'bg-blue-50 text-blue-600' :
                    appt.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                    {appt.status}
                </span>
            )
        },
        {
            header: "Priority",
            accessor: (appt: any) => {
                const colors = {
                    Emergency: "bg-red-500",
                    Urgent: "bg-orange-500",
                    Normal: "bg-green-500"
                };
                return (
                    <div className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${colors[appt.priority as keyof typeof colors] || 'bg-slate-300 animate-pulse'}`} />
                        <span className="font-medium text-xs">{appt.priority}</span>
                    </div>
                );
            }
        },
        {
            header: "Actions",
            accessor: (appt: any) => (
                <div className="flex gap-2">
                    {/* View  */}
                    <button onClick={() => { setModalState({ isOpen: true, mode: 'view', data: appt }); }} className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors">
                        <EyeIcon className="size-5" />
                    </button>
                    {/* Edit  */}
                    <button onClick={() => { setModalState({ isOpen: true, mode: 'edit', data: appt }); }} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                        <PencilSquareIcon className="size-5" />
                    </button>
                    <button onClick={() => { handleDelete(appt._id) }} className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                        <TrashIcon className="size-5" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="p-6 font-outfit">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Manage Appointments
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        View and manage your daily patient visits.
                    </p>
                </div>

                <div className="flex items-center gap-3 min-w-[300px]">
                    <div className="w-full max-w-[200px]">
                        <Input
                            label="" 
                            isSelect
                            value={filterStatus}
                            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
                            options={[
                                { value: "All", label: "All Appointments" },
                                { value: "Scheduled", label: "Scheduled" },
                                { value: "Completed", label: "Completed" },
                                { value: "Cancelled", label: "Cancelled" }
                            ]}
                            className="!py-2.5 w-full min-w-40"
                        />
                    </div>

                    <button
                        onClick={() => setModalState({ isOpen: true, mode: 'new', data: null })}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-100 dark:shadow-none whitespace-nowrap"
                    >
                        <PlusIcon className="size-5" /> New Appointment
                    </button>
                </div>
            </div>

            <DataTable columns={columns} data={appointments} isLoading={loading} />

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
                isLoading={loading}
            />

            <Modal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                title={`${modalState.mode.toUpperCase()} Appointment`}
            >
                <AppointmentForm
                    initialData={modalState.data}
                    onSubmit={handleFormSubmit}
                    isLoading={isSubmitting}
                    isView={modalState.mode === 'view'}
                />
            </Modal>
        </div>
    );
}