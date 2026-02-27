import { Scenario } from "@/components/ScenarioList";

export const calculateMMC = (lambda: number, mu: number, c: number) => {
  const rho = lambda / (c * mu);
  if (rho >= 1) {
    return {
      utilization: (rho * 100).toFixed(1),
      avgWaitTime: "∞",
      avgQueueLength: "∞",
      probWait: "100.0",
    };
  }
  let sum = 0;
  for (let n = 0; n < c; n++) {
    sum += Math.pow(lambda / mu, n) / factorial(n);
  }
  const p0 = 1 / (sum + Math.pow(lambda / mu, c) / (factorial(c) * (1 - rho)));
  const pq = (Math.pow(lambda / mu, c) / (factorial(c) * (1 - rho))) * p0;
  const lq = (pq * rho) / (1 - rho);
  const wq = lq / lambda;
  const wqInSeconds = wq * 60;
  return {
    utilization: (rho * 100).toFixed(1),
    avgWaitTime: formatTime(wqInSeconds.toString()),
    avgQueueLength: lq.toFixed(2),
    probWait: (pq * 100).toFixed(1),
  };
};

const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
const formatTime = (seconds: string) => {
  if (seconds === "∞") return "∞";

  const s = parseFloat(seconds);

  if (s < 60) {
    return `${s.toFixed(1)}s`;
  } else {
    const minutes = s / 60;
    return `${minutes.toFixed(1)}m`;
  }
};

export const simulateQueue = (
  lambda: number,
  mu: number,
  c: number,
  duration: number,
) => {
  let currentTime = 0;
  const serverFreeTime = new Array(c).fill(0);
  let currentQueue = 0;

  const queuePerMinute: Record<number, number> = {};

  while (currentTime < duration) {
    const interArrivalTime = -Math.log(1 - Math.random()) / lambda;
    currentTime += interArrivalTime;

    if (currentTime > duration) break;

    const serviceTime = -Math.log(1 - Math.random()) / mu;
    serverFreeTime.sort((a, b) => a - b);

    const startTime = Math.max(currentTime, serverFreeTime[0]);
    const waitTime = startTime - currentTime;
    const endTime = startTime + serviceTime;

    serverFreeTime[0] = endTime;

    currentQueue =
      waitTime > 0 ? currentQueue + 1 : Math.max(0, currentQueue - 1);

    const minute = Math.floor(currentTime);
    queuePerMinute[minute] = currentQueue;
  }
  return Array.from({ length: duration + 1 }, (_, t) => ({
    time: t,
    value: queuePerMinute[t] ?? 0,
  }));
};

export const calculateAvgWaitSeconds = (
  lambda: number,
  mu: number,
  c: number,
): number => {
  const rho = lambda / (c * mu);
  if (rho >= 1) return Infinity;

  let sum = 0;
  for (let n = 0; n < c; n++) {
    sum += Math.pow(lambda / mu, n) / factorial(n);
  }

  const p0 = 1 / (sum + Math.pow(lambda / mu, c) / (factorial(c) * (1 - rho)));

  const pq = (Math.pow(lambda / mu, c) / (factorial(c) * (1 - rho))) * p0;

  const lq = (pq * rho) / (1 - rho);
  const wq = lq / lambda;

  return wq * 60;
};

export const calculateChange = (
  current: string,
  base: string,
  inverse = false,
) => {
  const currNum = parseFloat(current);
  const baseNum = parseFloat(base);

  if (!baseNum || isNaN(currNum)) return { percent: "0%", isPositive: true };

  const diff = ((currNum - baseNum) / baseNum) * 100;
  const absDiff = Math.abs(diff).toFixed(1);
  const isPositive = inverse ? diff < 0 : diff > 0;

  return {
    percent: `${absDiff}%`,
    isPositive: isPositive,
    direction: diff > 0 ? "up" : "down",
  };
};

export const getRecommendation = (scenarios: Scenario[]) => {
  if (scenarios.length < 2) return null;

  const [s1, s2] = scenarios;
  const wait1 = parseFloat(s1.results.avgWaitTime);
  const wait2 = parseFloat(s2.results.avgWaitTime);
  const best = wait1 < wait2 ? s1 : s2;
  const reduction = Math.abs(
    ((wait1 - wait2) / Math.max(wait1, wait2)) * 100,
  ).toFixed(1);

  return {
    name: best.name,
    reduction: reduction,
    utilization: best.results.utilization,
  };
};
