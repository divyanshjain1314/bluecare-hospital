'use client';

import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    UserCircleIcon,
    LockClosedIcon,
    BuildingOffice2Icon,
    PhotoIcon,
    PlusIcon,
    ArrowPathIcon,
    ShieldCheckIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import axios from 'axios';

export default function SettingsPage() {
    const { user } = useSelector((state: any) => state.auth);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [securityData, setSecurityData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        dob: '',
        address: '',
        specialization: '',
        bloodGroup: '',
        hospitalName: '',
        hospitalAddress: '',
        hospitalLogo: ''
    });

    useEffect(() => {
        fetchData();
    }, [user]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (user?.hospitalId) {
                const hRes = await axios.get(`/api/settings?hospitalId=${user.hospitalId}`);
                setFormData(prev => ({
                    ...prev,
                    hospitalName: hRes.data.hospitalName || '',
                    hospitalAddress: hRes.data.address || '',
                    hospitalLogo: hRes.data.hospitalLogo || ''
                }));
            }

            setFormData(prev => ({
                ...prev,
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                email: user?.email || '',
                phone: user?.phone || '',
                gender: user?.gender || '',
                dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
                address: user?.address || '',
                specialization: user?.specialization || '',
                bloodGroup: user?.bloodGroup || ''
            }));
        } catch (err) {
            console.error("Error fetching settings");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await axios.put('/api/settings', {
                userId: user._id,
                role: user.role,
                hospitalId: user.hospitalId,
                profile: {
                    phone: formData.phone,
                    gender: formData.gender,
                    dob: formData.dob,
                    address: formData.address,
                },
                hospital: {
                    hospitalName: formData.hospitalName,
                    address: formData.hospitalAddress,
                    hospitalLogo: formData.hospitalLogo
                }
            });

            setEditMode(false);
            alert("Settings updated successfully!");
        } catch (err) {
            alert("Update failed!");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (securityData.newPassword !== securityData.confirmPassword) {
            return alert("New passwords do not match!");
        }

        setLoading(true);
        try {
            await axios.post('/api/auth/change-password', {
                userId: user._id || user.id,
                currentPassword: securityData.currentPassword,
                newPassword: securityData.newPassword
            });
            alert("Password updated successfully!");
            setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err: any) {
            alert(err.response?.data?.error || "Failed to update password");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="p-8 font-outfit min-h-screen bg-[#fcfdfe] dark:bg-slate-950">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">
                        Settings<span className="text-blue-600">.</span>OS
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                        Configure your {user?.role} account
                    </p>
                </div>
                {!editMode ? (
                    <Button onClick={() => setEditMode(true)} className="bg-white border border-slate-200 text-slate-900! dark:bg-slate-800 dark:text-white! dark:border-slate-700 text-[10px] font-black uppercase tracking-widest px-6 h-10 rounded-xl hover:bg-slate-50 transition-all">
                        Edit Profile
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={() => { setEditMode(false); fetchData(); }} className="px-6 text-[10px] font-black uppercase text-slate-400">Cancel</button>
                        <Button onClick={handleSave} disabled={loading} className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-8 h-10 rounded-xl shadow-lg shadow-blue-200">
                            {loading ? <ArrowPathIcon className="size-4 animate-spin" /> : 'Save Changes'}
                        </Button>
                    </div>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:w-64 space-y-1">
                    <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all dark:shadow-none ${activeTab === 'profile' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-500 hover:bg-slate-100'}`}>
                        <UserCircleIcon className="size-5" /> Profile info
                    </button>

                    {user?.role === 'admin' && (
                        <button onClick={() => setActiveTab('hospital')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all ${activeTab === 'hospital' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-500 hover:bg-slate-100'}`}>
                            <BuildingOffice2Icon className="size-5" /> Hospital Settings
                        </button>
                    )}

                    <button onClick={() => setActiveTab('security')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all ${activeTab === 'security' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-500 hover:bg-slate-100'}`}>
                        <LockClosedIcon className="size-5" /> Security
                    </button>
                </div>

                <div className="flex-1 max-w-3xl">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">

                        {activeTab === 'profile' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-8 w-1 bg-blue-600 rounded-full" />
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white italic">Personal Information</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="First Name" value={formData.firstName} disabled />
                                    <Input label="Last Name" value={formData.lastName} disabled />
                                    <Input label="Email Address" value={formData.email} disabled className="col-span-2" />

                                    <Input label="Phone Number" name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} disabled={!editMode} placeholder="+91 00000 00000" />

                                    <Input label="Gender" name="gender" isSelect options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }]} value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} disabled={!editMode} />

                                    <Input label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} disabled={!editMode} />

                                    {user?.role === 'patient' && <Input label="Blood Group" value={formData.bloodGroup} disabled />}
                                    {user?.role === 'doctor' && <Input label="Specialization" value={formData.specialization} disabled />}

                                    <div className="col-span-2 space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Personal Address</label>
                                        <textarea
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            disabled={!editMode}
                                            className="w-full p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm min-h-20 focus:ring-2 focus:ring-blue-500/10 disabled:opacity-50 transition-all"
                                            placeholder="Your home address..."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'hospital' && user?.role === 'admin' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-8 w-1 bg-emerald-500 rounded-full" />
                                    <h3 className="text-lg font-bold text-slate-900 italic">Hospital Branding</h3>
                                </div>

                                <div className="flex items-center gap-6 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-4xl border border-slate-100 dark:border-slate-800">
                                    <div className="relative group cursor-pointer" onClick={() => editMode && fileInputRef.current?.click()}>
                                        <input type="file" ref={fileInputRef} className="hidden" />
                                        <div className="size-24 rounded-4xl bg-white border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                                            {formData.hospitalLogo ? <img src={formData.hospitalLogo} className="size-full object-cover" /> : <PhotoIcon className="size-8 text-slate-200" />}
                                        </div>
                                        {editMode && <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-2 rounded-full text-white shadow-lg"><PlusIcon className="size-3" /></div>}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black uppercase italic text-slate-900">{formData.hospitalName || 'Unnamed Clinic'}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">Authorized Workspace</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Input label="Public Hospital Name" value={formData.hospitalName} onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })} disabled={!editMode} />

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Hospital Physical Address</label>
                                        <textarea
                                            value={formData.hospitalAddress}
                                            onChange={(e) => setFormData({ ...formData, hospitalAddress: e.target.value })}
                                            disabled={!editMode}
                                            className="w-full p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm focus:ring-2 focus:ring-emerald-500/10 min-h-25 disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <form onSubmit={handlePasswordUpdate} className="space-y-6 animate-in fade-in slide-in-from-right-4">
                                <div className="flex items-center gap-3 mb-4 text-blue-600">
                                    <ShieldCheckIcon className="size-6" />
                                    <h3 className="text-lg font-bold italic text-slate-900 dark:text-white">Security Protocol</h3>
                                </div>

                                <Input
                                    label="Current Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={securityData.currentPassword}
                                    onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                                    required
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="New Password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={securityData.newPassword}
                                        onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                                        required
                                    />
                                    <Input
                                        label="Confirm New Password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={securityData.confirmPassword}
                                        onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest h-14 rounded-2xl mt-4 shadow-xl shadow-slate-200 hover:bg-black transition-all"
                                >
                                    {loading ? <ArrowPathIcon className="size-5 animate-spin mx-auto" /> : 'Update Security Key'}
                                </Button>

                                <p className="text-[10px] text-slate-400 font-medium text-center uppercase tracking-tighter">
                                    Last password change: {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'Never'}
                                </p>
                            </form>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}