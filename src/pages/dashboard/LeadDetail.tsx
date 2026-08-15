import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Lead } from '@/types/database';
import { Loader2, ArrowLeft, Building2, Mail, Calendar, User, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function LeadDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      setLoading(true);
      // Mock missing data
      toast.error("Mocked mode: Lead not found.");
      navigate('/dashboard/leads');
    } catch (error: any) {
      toast.error(error.message);
      navigate('/dashboard/leads');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!lead) return;
    try {
      setLead({ ...lead, status: newStatus as Lead['status'] });
      toast.success('Status updated');
    } catch (error: any) {
      toast.error('Failed to update status: ' + error.message);
    }
  };

  const convertToClient = async () => {
    if (!lead) return;
    
    const confirm = window.confirm('Are you sure you want to convert this lead to a client?');
    if (!confirm) return;

    try {
      setConverting(true);
      
      // 1. Create client slug
      const slug = lead.company 
        ? lead.company.toLowerCase().replace(/[^a-z0-9]+/g, '-') 
        : lead.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      toast.success('Lead converted to client! (Mocked)');
      navigate(`/dashboard/clients/${slug}`);
      
    } catch (error: any) {
      toast.error('Failed to convert: ' + error.message);
      setConverting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!lead) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <Link 
        to="/dashboard/leads" 
        className="inline-flex items-center text-sm text-gray-400 hover:text-[#E8E8E8] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Leads
      </Link>

      <div className="bg-[#111] border border-[#222] rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display text-[#E8E8E8] mb-2">{lead.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              {lead.company && (
                <span className="flex items-center"><Building2 className="w-4 h-4 mr-1.5" />{lead.company}</span>
              )}
              {lead.email && (
                <span className="flex items-center"><Mail className="w-4 h-4 mr-1.5" />{lead.email}</span>
              )}
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" />{new Date(lead.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={lead.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-[#0A0A0A] border border-[#333] text-[#E8E8E8] text-sm rounded-md py-2 px-3 focus:ring-accent focus:border-accent"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal Sent</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
            
            {lead.status !== 'converted' && (
              <button
                onClick={convertToClient}
                disabled={converting}
                className="flex items-center px-4 py-2 bg-accent text-[#0A0A0A] text-sm font-medium rounded-md hover:bg-accent-hover transition-colors disabled:opacity-50"
              >
                {converting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                Convert to Client
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#222]">
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Lead Details</h3>
            <div className="space-y-4">
              <div>
                <span className="block text-xs text-gray-500 mb-1">Source</span>
                <span className="text-[#E8E8E8] capitalize">{lead.source?.replace('-', ' ') || 'Direct'}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Notes</h3>
            <div className="bg-[#0A0A0A] rounded-md p-4 min-h-[120px] text-sm text-[#E8E8E8] border border-[#222]">
              {lead.notes || <span className="text-gray-500 italic">No notes added yet.</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
