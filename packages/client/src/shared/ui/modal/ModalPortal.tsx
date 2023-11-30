import ReactDom from 'react-dom';

interface PropsType {
	children: React.ReactNode;
}

export default function ModalPortal({ children }: PropsType) {
	const el = document.getElementById('modal-root')!;
	return ReactDom.createPortal(children, el);
}
