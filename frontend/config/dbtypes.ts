export interface Event {
  event_id: number;
  contributer_id: number;
  event_name: string;
  event_description: string;
  event_likes: number;
  start_time: Date;
  end_time: Date;
  event_location: string;
  date_created: string;
  date_modified: string;
}