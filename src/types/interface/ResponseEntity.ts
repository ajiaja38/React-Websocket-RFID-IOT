export interface ResponseEntity {
  code: number;
  status: boolean;
  message: string;
  data: {
    userGuid: string;
  };
}
