import React, { useState } from 'react';
import { RefreshCw, Clock, Target, BookOpen } from 'lucide-react';

const CodingInterviewChallenges = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [currentChallenge, setCurrentChallenge] = useState(null);

  const challenges = {
    arrays: [
      {
        title: "Two Sum",
        difficulty: "Easy",
        timeLimit: "15 min",
        description: "Given an array of integers and a target sum, return indices of two numbers that add up to the target.",
        example: "Input: [2,7,11,15], target = 9 → Output: [0,1]",
        hints: ["Try using a hash map to store complements", "Think about the time complexity trade-off"],
        companies: ["Google", "Amazon", "Microsoft"]
      },
      {
        title: "Container With Most Water",
        difficulty: "Medium",
        timeLimit: "20 min",
        description: "Find two lines that together with the x-axis forms a container that holds the most water.",
        example: "Input: [1,8,6,2,5,4,8,3,7] → Output: 49",
        hints: ["Two pointer technique works well here", "Think about when to move which pointer"],
        companies: ["Facebook", "Apple", "Netflix"]
      },
      {
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        timeLimit: "35 min",
        description: "Find the median of two sorted arrays with O(log(min(m,n))) time complexity.",
        example: "Input: [1,3], [2] → Output: 2.0",
        hints: ["Binary search approach", "Think about partitioning both arrays"],
        companies: ["Google", "Uber"]
      }
    ],
    strings: [
      {
        title: "Valid Anagram",
        difficulty: "Easy",
        timeLimit: "10 min",
        description: "Given two strings, determine if they are anagrams of each other.",
        example: "Input: 'anagram', 'nagaram' → Output: true",
        hints: ["Count character frequencies", "Consider sorting approach"],
        companies: ["Amazon", "Bloomberg"]
      },
      {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        timeLimit: "25 min",
        description: "Find the length of the longest substring without repeating characters.",
        example: "Input: 'abcabcbb' → Output: 3 ('abc')",
        hints: ["Sliding window technique", "Use a set to track characters"],
        companies: ["Amazon", "Microsoft", "Apple"]
      },
      {
        title: "Regular Expression Matching",
        difficulty: "Hard",
        timeLimit: "40 min",
        description: "Implement regular expression matching with '.' and '*' support.",
        example: "Input: s='aa', p='a*' → Output: true",
        hints: ["Dynamic programming approach", "Handle edge cases carefully"],
        companies: ["Google", "Facebook"]
      }
    ],
    trees: [
      {
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        timeLimit: "10 min",
        description: "Find the maximum depth (height) of a binary tree.",
        example: "Input: [3,9,20,null,null,15,7] → Output: 3",
        hints: ["Recursive approach is straightforward", "Consider iterative with queue"],
        companies: ["LinkedIn", "Amazon"]
      },
      {
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        timeLimit: "20 min",
        description: "Determine if a binary tree is a valid binary search tree.",
        example: "Input: [2,1,3] → Output: true",
        hints: ["In-order traversal should be sorted", "Pass min/max bounds"],
        companies: ["Facebook", "Microsoft", "Apple"]
      },
      {
        title: "Binary Tree Maximum Path Sum",
        difficulty: "Hard",
        timeLimit: "30 min",
        description: "Find the maximum sum of any path in a binary tree.",
        example: "Input: [1,2,3] → Output: 6 (2→1→3)",
        hints: ["Post-order traversal", "Handle negative values carefully"],
        companies: ["Google", "Amazon"]
      }
    ],
    dynamic_programming: [
      {
        title: "Climbing Stairs",
        difficulty: "Easy",
        timeLimit: "10 min",
        description: "Count distinct ways to climb n stairs (1 or 2 steps at a time).",
        example: "Input: n = 3 → Output: 3 (1+1+1, 1+2, 2+1)",
        hints: ["It's Fibonacci in disguise", "Can optimize space to O(1)"],
        companies: ["Adobe", "Apple"]
      },
      {
        title: "Coin Change",
        difficulty: "Medium",
        timeLimit: "25 min",
        description: "Find minimum number of coins needed to make a given amount.",
        example: "Input: coins=[1,3,4], amount=6 → Output: 2 (3+3)",
        hints: ["Bottom-up DP approach", "Initialize with 'impossible' values"],
        companies: ["Amazon", "Google", "Uber"]
      },
      {
        title: "Edit Distance",
        difficulty: "Hard",
        timeLimit: "35 min",
        description: "Find minimum operations to convert one string to another.",
        example: "Input: 'horse', 'ros' → Output: 3",
        hints: ["2D DP table", "Three operations: insert, delete, replace"],
        companies: ["Google", "Microsoft"]
      }
    ]
  };

  const categories = [
    { key: 'all', label: 'All Categories', icon: '🎯' },
    { key: 'arrays', label: 'Arrays', icon: '📊' },
    { key: 'strings', label: 'Strings', icon: '📝' },
    { key: 'trees', label: 'Trees', icon: '🌳' },
    { key: 'dynamic_programming', label: 'Dynamic Programming', icon: '🧮' }
  ];

  const companies = [
    { key: 'all', label: 'All Companies' },
    { key: 'Google', label: 'Google' },
    { key: 'Amazon', label: 'Amazon' },
    { key: 'Microsoft', label: 'Microsoft' },
    { key: 'Facebook', label: 'Meta (Facebook)' },
    { key: 'Apple', label: 'Apple' },
    { key: 'Netflix', label: 'Netflix' },
    { key: 'Uber', label: 'Uber' },
    { key: 'LinkedIn', label: 'LinkedIn' },
    { key: 'Bloomberg', label: 'Bloomberg' },
    { key: 'Adobe', label: 'Adobe' }
  ];
    { key: 'all', label: 'All Levels' },
    { key: 'Easy', label: 'Easy' },
    { key: 'Medium', label: 'Medium' },
    { key: 'Hard', label: 'Hard' }
  ];

  const getFilteredChallenges = () => {
    let allChallenges = [];
    
    if (selectedCategory === 'all') {
      Object.values(challenges).forEach(categoryList => {
        allChallenges.push(...categoryList);
      });
    } else {
      allChallenges = challenges[selectedCategory] || [];
    }

    if (selectedDifficulty !== 'all') {
      allChallenges = allChallenges.filter(c => c.difficulty === selectedDifficulty);
    }

    return allChallenges;
  };

  const getRandomChallenge = () => {
    const filtered = getFilteredChallenges();
    if (filtered.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * filtered.length);
    setCurrentChallenge(filtered[randomIndex]);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🚀 Coding Interview Challenge Generator
        </h1>
        <p className="text-gray-600">Practice problems tailored for internship interviews</p>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.key} value={cat.key}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select 
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {difficulties.map(diff => (
                <option key={diff.key} value={diff.key}>
                  {diff.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={getRandomChallenge}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <RefreshCw className="w-5 h-5" />
          Generate Random Challenge
        </button>
      </div>

      {/* Current Challenge */}
      {currentChallenge && (
        <div className="bg-white border-2 border-blue-200 rounded-lg p-6 shadow-lg">
          <div className="flex flex-wrap items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentChallenge.title}</h2>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentChallenge.difficulty)}`}>
                {currentChallenge.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium text-blue-600 bg-blue-100 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {currentChallenge.timeLimit}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Problem Description
              </h3>
              <p className="text-gray-700 leading-relaxed">{currentChallenge.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Example</h3>
              <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                {currentChallenge.example}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Hints
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {currentChallenge.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Companies that ask this</h3>
              <div className="flex flex-wrap gap-2">
                {currentChallenge.companies.map((company, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm text-yellow-800">
              <strong>Interview Tip:</strong> Start by clarifying the problem, walk through examples, 
              discuss your approach before coding, and don't forget to test your solution!
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!currentChallenge && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Practice?</h3>
          <p className="text-gray-600">Select your preferences above and click "Generate Random Challenge" to get started!</p>
        </div>
      )}

      {/* Footer Stats */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>💡 {Object.values(challenges).flat().length} curated problems from top tech companies</p>
      </div>
    </div>
  );
};

export default CodingInterviewChallenges;