import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Lead } from '@/types/database';
import { Loader2, Plus, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'contacted': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'qualified': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'proposal': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'converted': return 'bg-accent/10 text-accent border-accent/20';
      case 'lost': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display text-[#E8E8E8]">Leads</h1>
          <p className="text-gray-400 mt-1">Manage prospective clients and inquiries.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-accent text-[#0A0A0A] text-sm font-medium rounded-md hover:bg-accent-hover transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </button>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-[#1a1a1a] border-b border-[#222]">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Source</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No leads found. Waiting for new inquiries...
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-[#222] hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#E8E8E8]">{lead.name}</div>
                      <div className="text-xs text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4">{lead.company || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs border ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 capitalize">{lead.source?.replace('-', ' ') || '-'}</td>
                    <td className="px-6 py-4">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/dashboard/leads/${lead.id}`}
                        className="inline-flex items-center text-accent hover:text-accent-hover"
                      >
                        View <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
