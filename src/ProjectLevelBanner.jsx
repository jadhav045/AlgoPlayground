// components/ProjectLevelBanner.jsx
import React from "react";
import { Trophy, ArrowRight, Lock, CheckCircle2 } from "lucide-react";

const ProjectLevelBanner = ({ currentLevel = 1 }) => {
  const levels = [
    {
      level: 1,
      title: "Core Logic & DSA",
      description: "Algorithm Visualizer",
      status: "current",
      link: "/algo-playground",
      color: "from-purple-500 to-pink-500",
      badge: "Fundamentals",
    },
    {
      level: 2,
      title: "CRUD + Auth + DB",
      description: "Task Management System",
      status: "next",
      link: "/task-manager",
      color: "from-blue-500 to-cyan-500",
      badge: "Backend Basics",
    },
    {
      level: 3,
      title: "Fintech Domain",
      description: "Expense Tracker Pro",
      status: "locked",
      link: "/expense-tracker",
      color: "from-green-500 to-emerald-500",
      badge: "Real-world",
    },
    {
      level: 4,
      title: "Scalable Architecture",
      description: "Social Media Platform",
      status: "locked",
      link: "/social-app",
      color: "from-orange-500 to-red-500",
      badge: "System Design",
    },
    {
      level: 5,
      title: "Next-Gen Intelligence",
      description: "AI-Powered Assistant",
      status: "locked",
      link: "/ai-assistant",
      color: "from-violet-500 to-purple-500",
      badge: "Advanced",
    },
  ];

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Current Level Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`bg-gradient-to-r ${
                levels[currentLevel - 1].color
              } p-2 rounded-lg`}
            >
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Learning Journey
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${
                    levels[currentLevel - 1].color
                  } text-white font-medium`}
                >
                  Level {currentLevel}
                </span>
              </div>
              <h3 className="text-white font-semibold">
                {levels[currentLevel - 1].title}
              </h3>
            </div>
          </div>

          {/* Next Level Preview */}
          {currentLevel < 5 && (
            <a
              href={levels[currentLevel].link}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all group"
            >
              <span className="text-sm">Next: Level {currentLevel + 1}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>

        {/* Progress Timeline */}
        <div className="relative">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {levels.map((level, index) => (
              <div
                key={level.level}
                className="flex items-center flex-shrink-0"
              >
                {/* Level Card */}
                <div
                  className={`relative group ${
                    level.status === "current"
                      ? "scale-105"
                      : level.status === "locked"
                      ? "opacity-50"
                      : "opacity-75"
                  }`}
                >
                  <a
                    href={level.status !== "locked" ? level.link : "#"}
                    className={`block ${
                      level.status === "locked"
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <div
                      className={`w-32 sm:w-36 p-3 rounded-lg border-2 transition-all ${
                        level.status === "current"
                          ? `border-purple-500 bg-gradient-to-br ${level.color} bg-opacity-10`
                          : level.status === "next"
                          ? "border-slate-600 bg-slate-800/50 hover:border-slate-500"
                          : "border-slate-700 bg-slate-800/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs font-bold ${
                            level.status === "current"
                              ? "text-purple-400"
                              : "text-slate-400"
                          }`}
                        >
                          LVL {level.level}
                        </span>
                        {level.status === "current" && (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        )}
                        {level.status === "locked" && (
                          <Lock className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                      <div className="text-xs font-semibold text-white mb-1 line-clamp-1">
                        {level.title}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1 mb-2">
                        {level.description}
                      </div>
                      <span
                        className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                          level.status === "current"
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        {level.badge}
                      </span>
                    </div>
                  </a>
                </div>

                {/* Connector Arrow */}
                {index < levels.length - 1 && (
                  <div className="flex-shrink-0 mx-1 sm:mx-2">
                    <ArrowRight
                      className={`w-4 h-4 ${
                        level.status === "current"
                          ? "text-purple-500"
                          : "text-slate-600"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400">
            A progressive learning series: from fundamentals to advanced system
            design
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectLevelBanner;
