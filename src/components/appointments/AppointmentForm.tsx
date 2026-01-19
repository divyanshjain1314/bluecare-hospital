// components/appointments/AppointmentForm.tsx
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { format, parse } from 'date-fns';
import { useSelector } from 'react-redux'; // User role check karne ke liye

interface patient {
    _id: string;
    name: string;
}
export const AppointmentForm = ({ initialData, onSubmit, isLoading, isView = false }: any) => {
    const { user } = useSelector((state: any) => state.auth);
    const [patients, setPatients] = useState<patient[]>([]);
    const [doctors, setDoctors] = useState([]);

    const [startDate, setStartDate] = useState<Date | null>(
        initialData?.date ? new Date(initialData.date) : new Date()
    );
    const [startTime, setStartTime] = useState<Date | null>(
        initialData?.time ? parse(initialData.time, 'HH:mm', new Date()) : new Date()
    );

    const [formData, setFormData] = useState({
        patientId: initialData?.patientId || '',
        patientName: initialData?.patientName || '',
        doctorId: initialData?.doctorId || '',
        doctorEmail: initialData?.doctorEmail || (user?.role === 'doctor' ? user?.email : ''),
        reason: initialData?.reason || '',
        status: initialData?.status || 'Scheduled',
        priority: initialData?.priority || 'Normal',
    });

    console.log('formData:', formData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Patients fetch karo
                const patientRes = await axios.get(`/api/patients?email=${user?.email}`);
                setPatients(patientRes.data);
                setFormData((prev) => ({
                    ...prev,
                    patientId: initialData?.patientId || patientRes.data[0]?._id || '',
                    patientName: initialData?.patientName || patientRes.data[0]?.name || '',
                }));
                // Agar Admin hai toh Doctors bhi fetch karo
                if (user?.role !== 'doctor') {
                    const doctorRes = await axios.get('/api/doctors');
                    setDoctors(doctorRes.data);
                }
            } catch (err) { console.error(err); }
        };
        if (!isView) fetchData();
    }, [isView, user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            date: startDate ? format(startDate, 'yyyy-MM-dd') : '',
            time: startTime ? format(startTime, 'HH:mm') : '',
        };
        onSubmit(finalData);
    };

    const datePickerClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:focus:ring-blue-900/20";

    return (
        <form onSubmit={handleSubmit} className="space-y-5 font-outfit">
            <Input
                label="Select Patient"
                isSelect
                disabled={isView}
                value={formData.patientId}
                options={patients.map((p: any) => ({ value: p._id, label: p.name }))}
                onChange={(e) => {
                    const selected: any = patients.find((p: any) => p._id === e.target.value);
                    setFormData({ ...formData, patientId: e.target.value, patientName: selected?.name || '' });
                }}
                required
            />

            {(user?.role === 'admin' || user?.role === 'superadmin') && (
                <Input
                    label="Assign Doctor"
                    isSelect
                    disabled={isView}
                    value={formData.doctorEmail}
                    options={doctors.map((doc: any) => ({
                        value: doc.email,
                        label: `Dr. ${doc.firstName} ${doc.lastName} (${doc.department})`
                    }))}
                    onChange={(e) => setFormData({ ...formData, doctorEmail: e.target.value })}
                    required
                />
            )}

            <div className="grid grid-cols-5 gap-4">
                <div className="flex flex-col gap-1.5 col-span-3">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Appointment Date</label>
                    <div className="relative">
                        <DatePicker
                            selected={startDate}
                            onChange={(date: any) => setStartDate(date)}
                            disabled={isView}
                            dateFormat="dd MMMM, yyyy"
                            minDate={new Date()}
                            className={datePickerClass}
                            calendarClassName="dark-datepicker"
                        />
                        <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 col-span-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Preferred Time</label>
                    <div className="relative">
                        <DatePicker
                            selected={startTime}
                            onChange={(time: any) => setStartTime(time)}
                            disabled={isView}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            className={datePickerClass}
                            calendarClassName="dark-datepicker"
                        />
                        <ClockIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                    </div>
                </div>
            </div>

            <Input
                label="Priority Level"
                isSelect
                disabled={isView}
                value={formData.priority}
                options={[
                    { value: 'Normal', label: '🟢 Normal' },
                    { value: 'Urgent', label: '🟠 Urgent' },
                    { value: 'Emergency', label: '🔴 Emergency' }
                ]}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            />

            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Reason for Visit</label>
                <textarea
                    disabled={isView}
                    rows={3}
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-4 dark:focus:ring-blue-900/20"
                    placeholder="Briefly describe the issue..."
                />
            </div>

            {!isView && (
                <Button type="submit" disabled={isLoading} className="w-full py-4 shadow-xl shadow-blue-100/50 dark:shadow-none">
                    {isLoading ? 'Booking...' : initialData ? 'Update Schedule' : 'Confirm Appointment'}
                </Button>
            )}
        </form>
    );
};