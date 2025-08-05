import { StatCard } from "../components/StatCard";
import { PolicyStatus } from "../components/PolicyStatus";
import { PieChart } from "../components/PieChart";
import { MetricGrid } from "../components/MetricGrid";
import Layout from "../components/Layout";
import { Shield, Globe, Zap, FileCheck } from "lucide-react";

export default function Index() {
  const formatTypesData = [
    { name: "Domain", value: 40, color: "hsl(200, 100%, 50%)" },
    { name: "Port", value: 30, color: "hsl(250, 70%, 60%)" },
    { name: "Application", value: 30, color: "hsl(320, 70%, 60%)" },
  ];

  const policyStatusMetrics = [
    { label: "Traffic Input Rate", value: 50 },
    { label: "Client Hello Received", value: 50 },
    { label: "HTTP Packet Received", value: 50 },
    { label: "SSL Domains Found", value: 50 },
    { label: "HTTP Domains Found", value: 50 },
    { label: "Domains Matched with Policy", value: 50 },
  ];

  const additionalMetrics = [
    { label: "IP Packets Matched", value: 50 },
    { label: "IP+Port Packets Matched", value: 50 },
  ];

  return (
    <Layout activeItem="home">
      <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor your network policy statistics and performance</p>
      </div>

      {/* Policy Statistics */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Policy Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            title="Total Policies"
            value={661}
            icon={FileCheck}
            color="blue"
          />
          <StatCard
            title="Active"
            value={9}
            icon={Zap}
            color="green"
          />
          <StatCard
            title="Inactive"
            value={67}
            icon={Shield}
            color="orange"
          />
          <StatCard
            title="Rejected"
            value={43}
            icon={Globe}
            color="red"
          />
        </div>
      </div>

      {/* Policy Types and Format Types Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Policy Types</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="Domain" value={50} color="blue" />
            <StatCard title="Port" value={50} color="purple" />
            <StatCard title="Application" value={50} color="pink" />
          </div>
        </div>

        <PieChart data={formatTypesData} title="Format Types" />
      </div>

      {/* Policy Status Bar */}
      <PolicyStatus active={700} inactive={300} pending={500} />

      {/* Policy Status Metrics */}
      <MetricGrid 
        title="Policy status"
        metrics={policyStatusMetrics}
        columns={6}
      />

      {/* Additional Policy Status */}
      <MetricGrid 
        title="Policy status"
        metrics={additionalMetrics}
        columns={2}
      />
      </div>
    </Layout>
  );
}
