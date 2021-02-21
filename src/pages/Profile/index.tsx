/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock, FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { useToast } from '../../hooks/Toast';

import getValidateErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/Auth';
import Button from '../../components/Button';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          name: yup.string().required('Nome obrigatório'),
          email: yup
            .string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: yup.string(),
          password: yup.string().when('old_password', {
            is: val => !!val.length,
            then: yup.string().required('Campo obrigatório'),
            otherwise: yup.string(),
          }),
          password_confirmation: yup
            .string()
            .when('old_password', {
              is: val => !!val.length,
              then: yup.string().required('Campo obrigatório'),
              otherwise: yup.string(),
            })
            .oneOf([yup.ref('password'), 'null'], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Atualização realizada com sucesso',
          description:
            'Suas informações de perfil foram atualizadas com sucesso',
        });
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidateErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado',
            description: 'O avatar foi atualizado',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input
            defaultValue={user.name}
            name="name"
            icon={FiUser}
            placeholder="Nome"
          />
          <Input
            containerStyle={{ color: 'blue' }}
            defaultValue={user.email}
            name="email"
            icon={FiMail}
            disabled
            placeholder="E-Mail"
          />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
