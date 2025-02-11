export const NEXT_URL:string = process.env.NEXT_URL || '';
export const SPRING_URL:string = process.env.SPRING_URL ||'';
export const ADMIN_URL: string = process.env.ADMIN_URL || '';
export const SKILLS = [
    "C",
    "C++",
    "C#",
    "Java",
    "JavaScript",
    "Kotlin",
    "Python",
    "Go",
    "Ruby",
    "Scala",
    "Swift",
    "SQL",
    "Oracle"
  ];
  export const SKILLS_LOGO :{
    [key: string]: { logo: string };
  } = {
    C: { logo: "/icons/c.png" },
    "C++": { logo: "/icons/cpp.png" },
    "C#": { logo: "/icons/cSharp.png" },
    Java: { logo: "/icons/java.png" },
    JavaScript: { logo: "/icons/javaScript.png" },
    Kotlin: { logo: "/icons/kotlin.png" },
    Python: { logo: "/icons/python.png" },
    Go: { logo: "/icons/go.png" },
    Ruby: { logo: "/icons/ruby.png" },
    Scala: { logo: "/icons/scala.png" },
    Swift: { logo: "/icons/swift.png" },
    SQL: { logo: "/icons/sql.png" },
    Oracle: { logo: "/icons/oracle.png" }
  };

  export const PLATFORMLIST = [
    {
      platform: "solved.ac",
      level: [
        { label: "브론즈 5", value: 1 },
        { label: "브론즈 4", value: 2 },
        { label: "브론즈 3", value: 3 },
        { label: "브론즈 2", value: 4 },
        { label: "브론즈 1", value: 5 },
        { label: "실버 5", value: 6 },
        { label: "실버 4", value: 7 },
        { label: "실버 3", value: 8 },
        { label: "실버 2", value: 9 },
        { label: "실버 1", value: 10 },
        { label: "골드 5", value: 11 },
        { label: "골드 4", value: 12 },
        { label: "골드 3", value: 13 },
        { label: "골드 2", value: 14 },
        { label: "골드 1", value: 15 },
        { label: "플레 5", value: 16 },
        { label: "플레 4", value: 17 },
        { label: "플레 3", value: 18 },
        { label: "플레 2", value: 19 },
        { label: "플레 1", value: 20 },
        { label: "다이아 5", value: 26 },
        { label: "다이아 4", value: 27 },
        { label: "다이아 3", value: 28 },
        { label: "다이아 2", value: 29 },
        { label: "다이아 1", value: 30 },
        { label: "루비 5", value: 31 },
        { label: "루비 4", value: 32 },
        { label: "루비 3", value: 33 },
        { label: "루비 2", value: 34 },
        { label: "루비 1", value: 35 },
        { label: "마스터 (이상)", value: 36 },
      ],
      code: "SV",
    },
    {
      platform: "프로그래머스",
      level: [
        { label: "레벨1 풀이가능", value: 4 },
        { label: "레벨2 풀이가능", value: 8 },
        { label: "레벨3 풀이가능", value: 13 },
        { label: "레벨4 풀이가능", value: 19 },
        { label: "레벨5 풀이가능", value: 28 },
      ],
      code: "PG",
    },
    {
      platform: "CodeForces",
      level: [
        { label: "0~800", value: 5 },
        { label: "801~1200", value: 8 },
        { label: "1201~1400", value: 12 },
        { label: "1401~1600", value: 14 },
        { label: "1601~1900", value: 17 },
        { label: "1901~2100", value: 20 },
        { label: "2101~", value: 28 },
      ],
      code: "CF",
    },
  ];

  export const FEILDLIST = [
    "IT 서비스",
    "금융",
    "게임",
    "솔루션",
    "SI",
    "SM",
    "빅테크",
    "대기업",
    "중견기업",
    "중소기업",
    "스타트업",
    "공기업",
  ];
  export const PROBLEM_TYPE = [
    { value: "문자열(String, string)", label: "문자열",type:'자료구조' },
    { value: "집합(Set, set)", label: "집합" ,type:'자료구조'},
    { value: "해시(Hash, hash, 해싱)", label: "해시" ,type:'자료구조'},
    { value: "스택(Stack, stack)", label: "스택",type:'자료구조' },
    { value: "큐(Queue, queue)", label: "큐" ,type:'자료구조'},
    { value: "덱(Deque, deque)", label: "덱" ,type:'자료구조'},
    { value: "힙(Heap)", label: "힙" ,type:'자료구조'},
    { value: "트리(Tree, tree)", label: "트리" ,type:'자료구조'},
    { value: "트라이(Trie, trie)", label: "트라이" ,type:'자료구조'},
    { value: "브루트포스(완전탐색, Brute Force, brute force)", label: "브루트포스",type:'알고리즘' },
    { value: "그리디(탐욕법, Greedy, greedy)", label: "그리디" ,type:'알고리즘'},
    { value: "DP(동적 계획법, 다이나믹 프로그래밍, Dynamic Programming, dynamic programming)", label: "DP" ,type:'알고리즘'},
    { value: "DFS(깊이우선탐색, dfs)", label: "DFS" ,type:'알고리즘'},
    { value: "BFS(너비우선탐색, bfs)", label: "BFS" ,type:'알고리즘'},
    { value: "이분탐색(이진탐색, Binary Search, binary search)", label: "이분탐색" ,type:'알고리즘'},
    { value: "그래프(Graph, graph)", label: "그래프" ,type:'알고리즘'},
    { value: "재귀(Recursion, recursion)", label: "재귀" ,type:'알고리즘'},
    { value: "백트래킹(Backtracking, backtracking)", label: "백트래킹" ,type:'알고리즘'},
    { value: "구현(Implementation, implementation)", label: "구현" ,type:'알고리즘'},
    { value: "누적 합(Prefix Sum, prefix sum, 누적합)", label: "누적 합" ,type:'알고리즘'},
    { value: "시뮬레이션(Simulation, simulation, 구현)", label: "시뮬레이션" ,type:'알고리즘'},
    { value: "정렬(Sort, sort)", label: "정렬" ,type:'알고리즘'},
    { value: "최단 거리(Shortest Path, shortest path)", label: "최단 거리" ,type:'알고리즘'},
    { value: "우선순위 큐(Priority Queue, priority queue, 우선순위큐)", label: "우선순위 큐" ,type:'알고리즘'},
    { value: "투 포인터(Two Pointer, two pointer, 투포인터)", label: "투 포인터" ,type:'알고리즘'},
    { value: "슬라이딩 윈도우(Sliding Window, sliding window, 슬라이딩윈도우)", label: "슬라이딩 윈도우" ,type:'알고리즘'},
    { value: "조합(Combination, combination)", label: "조합" ,type:'알고리즘'},
    { value: "다익스트라(Dijkstra, dijkstra)", label: "다익스트라" ,type:'알고리즘'},
    { value: "벨만 포드(Bellman-Ford, bellman-ford)", label: "벨만 포드" ,type:'알고리즘'},
    { value: "플로이드-워셜(Floyd-Warshall, floyd-warshall)", label: "플로이드-워셜" ,type:'알고리즘'},
    { value: "위상 정렬(Topological Sorting, topological sorting, 위상정렬)", label: "위상 정렬" ,type:'알고리즘'},
    { value: "최소 신장 트리(MST, Minimum Spanning Tree, minimum spanning tree, 최소신장트리)", label: "최소 신장 트리" ,type:'알고리즘'},
    { value: "크루스칼(Kruskal Algorithm, kruskal algorithm)", label: "크루스칼" ,type:'알고리즘'},
    { value: "유니온 파인드(Union Find, union find, 유니온파인드", label: "유니온 파인드" ,type:'알고리즘'},
    { value: "비트마스킹(Bit Masking, bit masking)", label: "비트마스킹" ,type:'알고리즘'},
    { value: "KMP", label: "KMP" ,type:'알고리즘'},
    { value: "수학(Math, math)", label: "수학" ,type:'알고리즘'},
    { value: "JOIN", label: "JOIN" ,type:'SQL'},
    { value: "UNION", label: "UNION" ,type:'SQL'},
    { value: "ORDER BY", label: "ORDER BY" ,type:'SQL'},
    { value: "GROUP BY", label: "GROUP BY" ,type:'SQL'},
    { value: "DISTINCT", label: "DISTINCT" ,type:'SQL'},
    { value: "IS NULL", label: "IS NULL" ,type:'SQL'},
    { value: "COUNT", label: "COUNT" ,type:'SQL'},
    { value: "HAVING", label: "HAVING" ,type:'SQL'},
    { value: "LIMIT", label: "LIMIT" ,type:'SQL'},
    { value: "LIKE", label: "LIKE" ,type:'SQL'},
    { value: "String/Date", label: "String/Date" ,type:'SQL'},
    { value: "서브쿼리", label: "서브쿼리" ,type:'SQL'},
    { value: "집계함수", label: "집계함수" ,type:'SQL'}
];
export const TR_CAREER = [
  '신입','경력'
]  
export const PASS_STATUS
 = [
  '합격','불합격'
 ]

export const STATUS_OPTIONS = [
	{ value: 'NOT_STARTED', label: '처리 전' },
	{ value: 'IN_PROGRESS', label: '진행 중' },
	{ value: 'COMPLETED', label: '완료됨' },
	{ value: 'REJECTED', label: '거절됨' }
];