type FormState<Data, Error = any> =
  | {
      status: "initial";
    }
  | {
      status: "success";
      message: string;
      data: Data;
    }
  | {
      status: "error";
      message: string;
      error: Error;
    };
