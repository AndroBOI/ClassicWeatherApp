export interface DailyCardProps {
  day: string
  max: number
  min: number
  precipitation: number
  getDailyIcon: (index: number) => string
}


export type HourlyCardProps = {
  time: string;
  temp: number;
  formattedTime: (data: string) => string;
}
