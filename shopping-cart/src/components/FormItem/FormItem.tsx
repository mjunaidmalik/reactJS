import React from 'react';
import { Form } from 'react-bootstrap';

interface FormItemProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormItem: React.FC<FormItemProps> = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  handleOnChange,
}) => {
  return (
    <Form.Group controlId={id} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />
    </Form.Group>
  );
};

export default FormItem;
