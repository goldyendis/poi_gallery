import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./maincontent.css";

type MyPaginationProp = {
  count: number | undefined;
};

function MyPagination({ count }: MyPaginationProp) {
  const [searchParams] = useSearchParams();
  let pageNum =
    searchParams.get("page") === null ? 1 : parseInt(searchParams.get("page")!);
  const navigate = useNavigate();

  const onChange: PaginationProps["onChange"] = (page) => {
    searchParams.set("page", page.toString());
    navigate(`?${searchParams}`);
  };

  return (
    <Pagination
      className="pagination"
      total={count}
      defaultPageSize={24}
      hideOnSinglePage={true}
      showTotal={(count, range) => `${range[0]}-${range[1]} (${count})`}
      showSizeChanger={false}
      simple={false}
      onChange={onChange}
      current={pageNum}
    />
  );
}

export default MyPagination;
