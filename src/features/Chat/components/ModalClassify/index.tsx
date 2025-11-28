import {
  ExclamationCircleOutlined,
  LeftOutlined,
  TagTwoTone,
} from '@ant-design/icons';
import { Button, Input, message, Modal, Popover } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ServiceClassify from '@/api/classifyApi';

import { fetchListClassify } from '../../slice/chatSlice';
import { Edit, Plus, Tag, Trash } from 'lucide-react';

function ModalClassify({ isVisible, onCancel, onOpen }) {
  const dispatch = useDispatch();
  const previousName = useRef(null);
  const { classifies, colors } = useSelector((state) => state.chat);

  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [nameTag, setNameTag] = useState('');
  const [color, setColor] = useState({});
  const [isShowError, setIsShowError] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);

  useEffect(() => {
    if (colors.length > 0) {
      setColor(colors[0]);
    }
  }, [colors]);

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleCancelModalAdd = () => {
    setIsShowModalAdd(false);
  };

  const handleShowModalAdd = () => {
    setIsShowModalAdd(true);
    setIsModalEdit(false);
    setNameTag('');
    if (onCancel) {
      onCancel();
    }
  };

  const handleBackModal = () => {
    setIsShowModalAdd(false);
    setIsModalEdit(false);

    if (onOpen) {
      onOpen();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const index = classifies.findIndex(
      (ele) => ele.name.toLowerCase() === value.toLowerCase(),
    );

    // !isModalEdit &&
    if (index >= 0) {
      if (!isModalEdit) {
        setIsShowError(true);
      } else {
        if (
          previousName.current.name.toLowerCase() !==
          classifies[index].name.toLowerCase()
        ) {
          setIsShowError(true);
        }
      }
    } else {
      setIsShowError(false);
    }
    setNameTag(value);
  };

  const handleClickColor = (color) => {
    setColor(color);
  };

  const handleCreateClassify = async () => {
    if (isModalEdit) {
      try {
        await ServiceClassify.updateClassify(
          previousName.current._id,
          nameTag,
          color._id,
        );
        message.success('Cập nhật thành công');
        setIsShowModalAdd(false);
        dispatch(fetchListClassify());
        if (onOpen) {
          onOpen();
        }
      } catch (error) {
        message.error('Cập nhật thất bại');
      }
    } else {
      try {
        await ServiceClassify.addClassify(nameTag, color._id);
        message.success('Thêm thành công');
        setIsShowModalAdd(false);
        dispatch(fetchListClassify());
      } catch (error) {
        message.error('Thêm thất bại');
      }
    }

    setIsModalEdit(false);
  };

  const content = (
    <div className="popup-change-color">
      <span>Thay đổi màu thẻ</span>
      <div className="list-color">
        {colors.length > 0 &&
          colors.map((ele, index) => (
            <div
              key={index}
              onClick={() => handleClickColor(ele)}
              className="popup-color-item"
              style={{ background: ele.code }}
            />
          ))}
      </div>
    </div>
  );

  const handleEditClasify = (value) => {
    setIsModalEdit(true);
    setIsShowModalAdd(true);
    if (onCancel) {
      onCancel();
    }
    setNameTag(value.name);
    setColor(value.color);
    previousName.current = value;
  };

  const handleDeleteClasify = async (value) => {
    try {
      await ServiceClassify.deleteClassify(value._id);
      message.success('Xóa thành công');
      dispatch(fetchListClassify());
    } catch (error) {
      message.error('Xóa thất bại');
    }
  };

  function confirm(value) {
    Modal.confirm({
      title: 'Cảnh báo',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có thực sự muốn xóa ? `,
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: () => {
        handleDeleteClasify(value);
      },
    });
  }

  return (
    <>
      <Modal
        open={isVisible}
        title="Quản lý thẻ phân loại"
        onCancel={handleCancel}
        footer={null}
      >
        <div className="space-y-2">
          {classifies.map((ele, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
            >
              <div className="flex items-center gap-2">
                <TagTwoTone twoToneColor={ele.color.code} />
                <div className="text-sm font-medium">{ele.name}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="p-1 hover:bg-gray-200 rounded"
                  onClick={() => handleEditClasify(ele)}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  className="p-1 hover:bg-gray-200 rounded"
                  onClick={() => confirm(ele)}
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <button
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleShowModalAdd}
          >
            <Plus className="w-4 h-4" /> Thêm phân loại
          </button>
        </div>
      </Modal>

      <Modal
        title={
          <div className="modal-add_header">
            <div className="modal-add_header--icon" onClick={handleBackModal}>
              <LeftOutlined />
            </div>
            <span>
              {isModalEdit ? 'Chi Tiết thẻ phân loại' : 'Thêm thẻ phân loại'}
            </span>
          </div>
        }
        open={isShowModalAdd}
        onOk={handleCreateClassify}
        onCancel={handleCancelModalAdd}
        okButtonProps={{
          disabled:
            (nameTag.trim().length > 0 ? false : true) ||
            isShowError ||
            !(
              previousName.current?.name !== nameTag ||
              previousName.current?.color._id !== color?._id
            ),
        }}
        okText={isModalEdit ? 'Cập nhật' : 'Thêm phân loại'}
        cancelText="Hủy"
      >
        <div className="modal-add-classify_wrapper">
          <div className="modal-add-classify--title">Tên thẻ phân loại</div>

          <div className="modal-add-classify--input">
            <Input
              spellCheck={false}
              value={nameTag}
              size="middle"
              placeholder="Nhập tên thẻ phân loại"
              onChange={handleInputChange}
              suffix={
                <div className="tag-select-icon">
                  <Popover content={content} trigger="click">
                    <Button
                      type="text"
                      icon={<TagTwoTone twoToneColor={color?.code} />}
                    />
                  </Popover>
                </div>
              }
            />
          </div>

          <div className="check-name-classify">
            {isShowError && (
              <h4 style={{ color: 'red' }}>
                <InfoCircleFilled />
                Tên phân loại đã tồn tại
              </h4>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalClassify;
