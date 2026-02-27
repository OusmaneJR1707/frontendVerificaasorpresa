-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Feb 27, 2026 alle 12:52
-- Versione del server: 10.11.14-MariaDB-0ubuntu0.24.04.1
-- Versione PHP: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `magazzino`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `Pezzi`
--

CREATE TABLE `Pezzi` (
  `pid` int(11) NOT NULL,
  `pnome` varchar(100) NOT NULL,
  `colore` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `Pezzi`
--

INSERT INTO `Pezzi` (`pid`, `pnome`, `colore`) VALUES
(1, 'Bullone M6', 'nero'),
(2, 'Dado M8', 'grigio'),
(3, 'Resistore 10kΩ', 'rosso'),
(4, 'Condensatore 100µF', 'blu'),
(5, 'Cavo elettrico 1m', 'giallo'),
(6, 'Interruttore ON/OFF', 'bianco'),
(7, 'Cuscinetto a sfera', 'grigio'),
(8, 'Molla compressione', 'nero'),
(9, 'Relè 12V', 'rosso'),
(10, 'Piastra metallica', 'blu'),
(11, 'Guarnizione in gomma', 'nero'),
(12, 'Pulsante momentaneo', 'rosso'),
(13, 'Rondella M10', 'grigio'),
(14, 'Lamina di rame', 'giallo'),
(15, 'Fusibile 5A', 'bianco'),
(16, 'Vite autofilettante', 'nero'),
(17, 'Elettromagnete', 'blu'),
(18, 'Supporto motore', 'grigio'),
(19, 'Condensatore ceramico', 'rosso'),
(20, 'Staffa angolare', 'nero'),
(21, 'Cinghia di trasmissione', 'nero'),
(22, 'Motore DC 12V', 'blu'),
(23, 'Terminale a crimpare', 'rosso'),
(24, 'Piastra isolante', 'bianco'),
(25, 'Dado cieco', 'grigio'),
(26, 'Coperchio metallico', 'nero'),
(27, 'Bobina di filo', 'giallo'),
(28, 'Resistenza di potenza', 'rosso'),
(29, 'Vite a testa esagonale', 'nero'),
(30, 'Rullino di guida', 'grigio'),
(31, 'Portafusibile', 'blu'),
(32, 'Tappo di chiusura', 'bianco'),
(33, 'Cuscinetto a rulli', 'grigio'),
(34, 'Interruttore a pulsante', 'rosso'),
(35, 'Cinghia dentata', 'nero'),
(36, 'Resistore variabile', 'giallo'),
(37, 'Condensatore elettrolitico', 'blu'),
(38, 'Vite a testa piatta', 'nero'),
(39, 'Piastra di montaggio', 'grigio'),
(40, 'Bobina induttiva', 'rosso'),
(41, 'Guarnizione O-ring', 'nero'),
(42, 'Molla di trazione', 'grigio'),
(43, 'Interruttore a scorrimento', 'blu'),
(44, 'Dado autobloccante', 'nero'),
(45, 'Terminale elettrico femmina', 'giallo'),
(46, 'Coperchio isolante', 'bianco'),
(47, 'Rondella elastica', 'grigio'),
(48, 'Supporto per relè', 'blu'),
(49, 'Vite M5x20', 'nero'),
(50, 'Condensatore a disco', 'rosso'),
(51, 'Cinghia piatta', 'giallo'),
(52, 'Bullone M8x30', 'nero'),
(53, 'Staffa di rinforzo', 'grigio'),
(54, 'Resistenza a filo', 'rosso'),
(55, 'Porta fusibile a pannello', 'bianco'),
(56, 'Rondella di sicurezza', 'grigio'),
(57, 'Motore passo-passo', 'blu'),
(58, 'Interruttore a pulsante luminoso', 'rosso'),
(59, 'Molla elicoidale', 'nero'),
(60, 'Dado M6', 'grigio'),
(61, 'Condensatore a film', 'blu'),
(62, 'Vite a brugola', 'nero'),
(63, 'Guarnizione piatta', 'giallo'),
(64, 'Cuscinetto radiale', 'grigio'),
(65, 'Relè 24V', 'rosso'),
(66, 'Terminale a vite', 'nero'),
(67, 'Supporto per scheda elettronica', 'bianco'),
(68, 'Bobina per trasformatore', 'grigio'),
(69, 'Dado esagonale', 'nero'),
(70, 'Piastra di rinforzo', 'blu'),
(71, 'Resistore di precisione', 'rosso'),
(72, 'Cavo flessibile', 'giallo'),
(73, 'Molla di torsione', 'nero'),
(74, 'Vite M10x40', 'grigio'),
(75, 'Condensatore variabile', 'blu'),
(76, 'Rondella di pressione', 'nero'),
(77, 'Coperchio motore', 'bianco'),
(78, 'Bullone testa cilindrica', 'nero'),
(79, 'Porta fusibile mini', 'rosso'),
(80, 'Interruttore generale', 'blu'),
(81, 'Cuscinetto a sfere inox', 'grigio'),
(82, 'Vite a testa svasata', 'nero'),
(83, 'Guarnizione in silicone', 'giallo'),
(84, 'Resistenza bobinata', 'rosso'),
(85, 'Staffa metallica L', 'grigio'),
(86, 'Condensatore polarizzato', 'blu'),
(87, 'Terminale maschio', 'nero'),
(88, 'Cinghia trapezoidale', 'giallo'),
(89, 'Molla di compressione corta', 'nero'),
(90, 'Dado M12', 'grigio'),
(91, 'Coperchio scatola elettrica', 'bianco'),
(92, 'Rondella piatta M8', 'grigio'),
(93, 'Motore brushless', 'blu'),
(94, 'Vite M4x16', 'nero'),
(95, 'Condensatore 220µF', 'rosso'),
(96, 'Interruttore a pulsante ON', 'giallo'),
(97, 'Bullone testa esagonale M6', 'nero'),
(98, 'Cuscinetto a sfere miniatura', 'grigio'),
(99, 'Resistore di potenza 50W', 'rosso'),
(100, 'Staffa di supporto verticale', 'nero'),
(101, 'Bobina di segnale', 'blu'),
(102, 'Dado a farfalla', 'giallo'),
(103, 'Guarnizione tonda', 'nero'),
(104, 'Cavo schermato', 'grigio'),
(105, 'Condensatore 470µF', 'rosso'),
(106, 'Vite M6x25', 'nero'),
(107, 'Terminale a crimpare piccolo', 'giallo'),
(108, 'Interruttore magnetico', 'bianco'),
(109, 'Molla elicoidale lunga', 'nero'),
(110, 'Piastra base', 'grigio'),
(111, 'Resistore chip', 'rosso'),
(112, 'Cinghia dentata piccola', 'blu'),
(113, 'Bullone testa piatta', 'nero'),
(114, 'Guarnizione quadrata', 'giallo'),
(115, 'Condensatore a elettrolita solido', 'blu'),
(116, 'Rondella elastica M6', 'grigio'),
(117, 'Vite autofilettante M4', 'nero'),
(118, 'Relè bistabile', 'rosso'),
(119, 'Coperchio isolante piccolo', 'bianco'),
(120, 'Motore passo-passo mini', 'blu'),
(121, 'Dado M5', 'grigio'),
(122, 'Cuscinetto flangiato', 'nero'),
(123, 'Resistore variabile rotativo', 'rosso'),
(124, 'Bobina motore', 'blu'),
(125, 'Molla di compressione media', 'nero'),
(126, 'Interruttore a levetta', 'giallo'),
(127, 'LED verde', 'verde'),
(128, 'Cavo elettrico verde 1m', 'verde'),
(129, 'Pulsante a pressione verde', 'verde'),
(130, 'Guarnizione in gomma verde', 'verde'),
(131, 'Molla compressione verde', 'verde'),
(132, 'Rondella M6 verde', 'verde'),
(133, 'Vite autofilettante verde', 'verde'),
(134, 'Porta fusibile verde', 'verde'),
(135, 'Staffa angolare verde', 'verde'),
(136, 'Interruttore ON/OFF verde', 'verde'),
(137, 'Condensatore verde', 'verde'),
(138, 'Resistore verde', 'verde'),
(139, 'Cuscinetto a sfere verde', 'verde'),
(140, 'Bobina di filo verde', 'verde'),
(141, 'Piastra metallica verde', 'verde'),
(142, 'Terminale a crimpare verde', 'verde'),
(143, 'Interruttore a pulsante verde', 'verde'),
(144, 'Dado M8 verde', 'verde'),
(145, 'Bullone M6 verde', 'verde'),
(146, 'Rondella elastica verde', 'verde'),
(147, 'Lisheng', 'giallo'),
(148, 'Villa', 'viola'),
(149, 'Andres', 'Verde'),
(150, 'Grena', 'lilla'),
(151, 'Erion', 'azzurro'),
(152, 'Pennetta', 'iridato'),
(153, 'Falzao', 'radioattivo'),
(154, 'Martinelli', 'rosso');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `Pezzi`
--
ALTER TABLE `Pezzi`
  ADD PRIMARY KEY (`pid`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `Pezzi`
--
ALTER TABLE `Pezzi`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
