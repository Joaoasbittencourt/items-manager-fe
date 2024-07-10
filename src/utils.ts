type FormState<Data> =
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
    };
