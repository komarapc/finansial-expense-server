export interface ResponseProps {
  success?: boolean;
  statusCode?: number;
  statusMessage?: string;
  message?: string;
  data?: any;
  error?: any;
  errorMessage?: string;
}
export class ResponseJSON {
  success?: boolean;
  statusCode?: number;
  statusMessage?: string;
  message?: string;
  data?: any;
  error?: any;
  errorMessage?: string;
  constructor(props: ResponseProps) {
    this.success = props.success;
    this.statusCode = props.statusCode;
    this.statusMessage = props.statusMessage;
    this.message = props.message;
    this.data = props.data;
    this.error = props.error;
    this.errorMessage = props.errorMessage;
  }
}
