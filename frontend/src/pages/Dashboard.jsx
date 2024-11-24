import { Link } from 'react-router-dom';
import { Upload, Folder, Heart } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const { user } = useSelector((state) => state.user);

  const stats = [
    { label: 'Projects', value: user?.project?.length, icon: Folder },
    { label: 'Followers', value: user?.followers?.length || 0, icon: Heart },
    { label: 'Credit', value: user?.credit || 0, icon: Heart },
    { label: 'Rank', value: user?.rank || 0, icon: Heart },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <br />
        <p className="text-gray-600">WELCOME BACK, {user?.name?.toUpperCase()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
              <Link to="/projects" className="text-sm text-indigo-600 hover:text-indigo-500">
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {user?.project?.map((project) => (
              <Link
                key={project._id}
                to={`/details/project/${project._id}`}
                className="block hover:bg-gray-50 -mx-6 px-6 py-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{project.title}</p>
                    <p className="text-sm text-gray-600">{project.category}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Heart className="h-4 w-4 mr-1" />
                    {project.likes || 0}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Documents</h2>
              <Link to="/documents" className="text-sm text-indigo-600 hover:text-indigo-500">
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {/* Similar structure for Documents (if you have document data in `user`) */}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow">
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-white mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold">Ready to share your work?</h3>
            <p className="text-indigo-100">Upload your projects and documents to get started</p>
          </div>
          <Link
            to="/upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
          >
            <Upload className="h-5 w-5 mr-2" />
            Upload Now
          </Link>
        </div>
      </div>
    </div>
  );
}
