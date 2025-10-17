import React, { useState } from 'react';
import { Menu, Search, User } from 'lucide-react';

const projectStats = {
  total: 10,
  incoming: 0,
  completed: 0,
  overdue: 1,
  inprogress: 0,
  nextFollowUp: 9
};

const clientData = {
  complete: 0,
  inProgress: 0,
  overdue: 10,
  incoming: 0,
  nextFollowUp: 90
};

const projectData = {
  'AUC - ERA D': {
    completed: 0,
    inprogress: 100,
    overdue: 0,
    paid: 0,
    nextFollowUp: 0
  }
};

const employeeData = {
  'Darryl Warner': {
    completed: 0,
    inprogress: 100,
    overdue: 0,
    paid: 0,
    nextFollowUp: 0
  }
};

const DonutChart = ({ data, colors }) => {
  const entries = Object.entries(data).filter(([_, value]) => value > 0);
  const total = entries.reduce((sum, [_, value]) => sum + value, 0);
  
  if (total === 0 || entries.length === 0) {
    return (
      <div className="relative w-40 h-40 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="30" fill="none" stroke="#e5e7eb" strokeWidth="20"/>
        </svg>
      </div>
    );
  }
  
  let cumulativePercent = 0;
  const paths = [];
  
  entries.forEach(([key, value]) => {
    const percent = value / total;
    const startAngle = cumulativePercent * 360;
    const endAngle = (cumulativePercent + percent) * 360;
    
    if (percent >= 0.9999) {
      paths.push({
        d: `M 50 20 A 30 30 0 1 1 49.99 20`,
        color: colors[key]
      });
    } else {
      const x1 = 50 + 30 * Math.cos((startAngle - 90) * Math.PI / 180);
      const y1 = 50 + 30 * Math.sin((startAngle - 90) * Math.PI / 180);
      const x2 = 50 + 30 * Math.cos((endAngle - 90) * Math.PI / 180);
      const y2 = 50 + 30 * Math.sin((endAngle - 90) * Math.PI / 180);
      
      const largeArc = endAngle - startAngle > 180 ? 1 : 0;
      
      paths.push({
        d: `M ${x1} ${y1} A 30 30 0 ${largeArc} 1 ${x2} ${y2}`,
        color: colors[key]
      });
    }
    
    cumulativePercent += percent;
  });

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {paths.map((path, idx) => (
          <path
            key={idx}
            d={path.d}
            fill="none"
            stroke={path.color}
            strokeWidth="20"
            strokeLinecap="butt"
          />
        ))}
      </svg>
    </div>
  );
};

const Legend = ({ data, colors, labels }) => {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs mt-2">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex items-center gap-1">
          <div className="w-3 h-2 flex-shrink-0" style={{ backgroundColor: colors[key] }}></div>
          <span className="text-gray-600 truncate text-xs">{labels[key]} {value.toFixed(2)}%</span>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [selectedClient, setSelectedClient] = useState('All');
  const [selectedProject, setSelectedProject] = useState('AUC - ERA D');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('AUC - ERA D');
  const [selectedEmployee, setSelectedEmployee] = useState('Darryl Warner');

  const clientColors = {
    complete: '#10b981',
    inProgress: '#3b82f6',
    overdue: '#ef4444',
    incoming: '#f59e0b',
    nextFollowUp: '#8b5cf6'
  };

  const projectColors = {
    completed: '#10b981',
    inprogress: '#3b82f6',
    overdue: '#ef4444',
    paid: '#14b8a6',
    nextFollowUp: '#8b5cf6'
  };

  const clientLabels = {
    complete: 'Complete',
    inProgress: 'InProgress',
    overdue: 'Overdue',
    incoming: 'Incoming',
    nextFollowUp: 'NextFollowUp'
  };

  const projectLabels = {
    completed: 'Completed',
    inprogress: 'Inprogress',
    overdue: 'Overdue',
    paid: 'Paid',
    nextFollowUp: 'Next Follow Up'
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-gray-100 rounded">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-16 py-1.5 text-sm border border-gray-300 rounded-lg w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
                Ctrl K
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Classic
            </button>
            <button className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              📄 Create
            </button>
            <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
              ⛶
            </button>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-xs font-medium text-blue-600">tester</div>
                <div className="text-xs text-gray-500">test@yopmail.com</div>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-3 overflow-hidden">
        <div className="h-full flex flex-col max-w-7xl mx-auto">
          <div className="bg-white rounded-lg p-3 mb-3 flex items-center justify-between flex-shrink-0">
            <div>
              <h1 className="text-lg font-semibold text-gray-800 mb-0.5">
                Hello tester, Welcome Back!
              </h1>
              <p className="text-xs text-gray-600 mb-2">
                Welcome to the team, tester! We're thrilled to have you on board.
              </p>
              <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                View Profile
              </button>
            </div>
            <div className="w-24">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect x='40' y='60' width='120' height='70' fill='%23f97316' rx='5'/%3E%3Crect x='45' y='45' width='110' height='60' fill='%23fff' stroke='%233b82f6' stroke-width='2' rx='5'/%3E%3Ccircle cx='80' cy='30' r='15' fill='%233b82f6'/%3E%3Cpath d='M80,45 L80,60 M70,50 L80,45 L90,50' stroke='%233b82f6' stroke-width='2' fill='none'/%3E%3Ccircle cx='140' cy='80' r='12' fill='%2310b981'/%3E%3Cpath d='M140,92 L140,110 M130,95 L140,92 L150,95' stroke='%2310b981' stroke-width='2' fill='none'/%3E%3Crect x='50' y='55' width='95' height='40' fill='%23dbeafe' rx='3'/%3E%3Cline x1='60' y1='65' x2='100' y2='65' stroke='%233b82f6' stroke-width='2'/%3E%3Cline x1='60' y1='75' x2='90' y2='75' stroke='%233b82f6' stroke-width='2'/%3E%3C/svg%3E" alt="Welcome" />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2 mb-3 flex-shrink-0">
            <div className="bg-white rounded-lg p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Total Projects</p>
                  <p className="text-xl font-bold">{projectStats.total}</p>
                </div>
                <div className="text-lg">📊</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Incoming</p>
                  <p className="text-xl font-bold">{projectStats.incoming}</p>
                </div>
                <div className="text-lg">📋</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Completed</p>
                  <p className="text-xl font-bold">{projectStats.completed}</p>
                </div>
                <div className="text-lg">📝</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Overdue</p>
                  <p className="text-xl font-bold">{projectStats.overdue}</p>
                </div>
                <div className="text-lg">⏰</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Inprogress</p>
                  <p className="text-xl font-bold">{projectStats.inprogress}</p>
                </div>
                <div className="text-lg">📋</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Next Follow Up</p>
                  <p className="text-xl font-bold">{projectStats.nextFollowUp}</p>
                </div>
                <div className="text-lg">📅</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
            <div className="bg-white rounded-lg p-3 flex flex-col">
              <h3 className="text-sm font-semibold mb-2">Client</h3>
              <div className="mb-2">
                <label className="text-xs text-blue-600 mb-1 block">Select Client</label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full p-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>All</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <DonutChart data={clientData} colors={clientColors} />
                <Legend data={clientData} colors={clientColors} labels={clientLabels} />
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 flex flex-col">
              <h3 className="text-sm font-semibold mb-2">Project</h3>
              <div className="mb-2">
                <label className="text-xs text-blue-600 mb-1 block">Select Project</label>
                <select
                  value={selectedProjectFilter}
                  onChange={(e) => setSelectedProjectFilter(e.target.value)}
                  className="w-full p-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.keys(projectData).map(project => (
                    <option key={project}>{project}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <DonutChart data={projectData[selectedProjectFilter]} colors={projectColors} />
                <Legend data={projectData[selectedProjectFilter]} colors={projectColors} labels={projectLabels} />
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 flex flex-col">
              <h3 className="text-sm font-semibold mb-2">Employee</h3>
              <div className="grid grid-cols-2 gap-1 mb-2">
                <div>
                  <label className="text-xs text-blue-600 mb-1 block">Select Project</label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full p-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.keys(projectData).map(project => (
                      <option key={project}>{project}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-blue-600 mb-1 block">Select Employee</label>
                  <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="w-full p-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.keys(employeeData).map(employee => (
                      <option key={employee}>{employee}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <DonutChart data={employeeData[selectedEmployee]} colors={projectColors} />
                <Legend data={employeeData[selectedEmployee]} colors={projectColors} labels={projectLabels} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}