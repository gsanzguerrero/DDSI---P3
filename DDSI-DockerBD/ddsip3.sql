-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db:3306
-- Tiempo de generación: 18-01-2024 a las 17:54:08
-- Versión del servidor: 5.7.44
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ddsip3`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ALERGENOS`
--

CREATE TABLE `ALERGENOS` (
  `IdAlergeno` int(11) NOT NULL,
  `Nombre` varchar(40) DEFAULT NULL,
  `Descripcion` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CLIENTES`
--

CREATE TABLE `CLIENTES` (
  `IdCliente` varchar(40) NOT NULL,
  `Valoracion` int(11) DEFAULT NULL,
  `Nombre` varchar(40) DEFAULT NULL,
  `UserName` varchar(40) DEFAULT NULL,
  `Contrasenia` varchar(40) DEFAULT NULL,
  `Domicilio` varchar(40) DEFAULT NULL,
  `Puntos` int(11) DEFAULT NULL,
  `FechaNacimiento` datetime DEFAULT NULL,
  `DatosDePago` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `CLIENTES`
--

INSERT INTO `CLIENTES` (`IdCliente`, `Valoracion`, `Nombre`, `UserName`, `Contrasenia`, `Domicilio`, `Puntos`, `FechaNacimiento`, `DatosDePago`) VALUES
('gonzalo@miemail.com', NULL, 'Gonzalo Sanz Guerrero', 'gonzasanz_', '1234abc', 'Calle A', 0, '2012-12-12 00:00:00', '123A'),
('jose', NULL, 'José Manuel Aranda Gutierrez', 'josemanuelaranda_', '12346ma', 'Calle B', 0, '2012-12-12 00:00:00', '123B');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CLIENTE_ALERGENOS`
--

CREATE TABLE `CLIENTE_ALERGENOS` (
  `IdCliente` varchar(40) NOT NULL,
  `IdAlergeno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CLIENTE_PEDIDO`
--

CREATE TABLE `CLIENTE_PEDIDO` (
  `IdCliente` varchar(40) NOT NULL,
  `IdPedido` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `INGREDIENTES`
--

CREATE TABLE `INGREDIENTES` (
  `IdIngrediente` int(11) NOT NULL,
  `Nombre` varchar(40) DEFAULT NULL,
  `NumStock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `INGREDIENTES_ALERGENOS`
--

CREATE TABLE `INGREDIENTES_ALERGENOS` (
  `IdIngrediente` int(11) NOT NULL,
  `IdAlergeno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PEDIDO`
--

CREATE TABLE `PEDIDO` (
  `IdPedido` int(11) NOT NULL,
  `Valoracion` int(11) DEFAULT NULL,
  `TPago` varchar(10) DEFAULT NULL,
  `Estado` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PEDIDO_RECETAS`
--

CREATE TABLE `PEDIDO_RECETAS` (
  `IdReceta` int(11) NOT NULL,
  `IdPedido` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Disparadores `PEDIDO_RECETAS`
--
DELIMITER $$
CREATE TRIGGER `ActualizarStock` BEFORE INSERT ON `PEDIDO_RECETAS` FOR EACH ROW BEGIN
   
    DECLARE cantidad INT;
    SELECT COUNT(*) INTO cantidad
    FROM PEDIDO_RECETAS
    WHERE IdReceta = NEW.IdReceta AND IdPedido = NEW.IdPedido;

    
    UPDATE Ingredientes i
    JOIN RECETAS_INGREDIENTES ir ON i.IdIngrediente = ir.IdIngrediente
    SET i.NumStock = CASE WHEN (i.NumStock - cantidad) < 0 THEN 0 ELSE (i.NumStock - cantidad) END
    WHERE ir.IdReceta = NEW.IdReceta;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RECETAS`
--

CREATE TABLE `RECETAS` (
  `IdReceta` int(11) NOT NULL,
  `Precio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RECETAS_INGREDIENTES`
--

CREATE TABLE `RECETAS_INGREDIENTES` (
  `IdReceta` int(11) NOT NULL,
  `IdIngrediente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RESERVAS`
--

CREATE TABLE `RESERVAS` (
  `IdReserva` int(11) NOT NULL,
  `IdMesa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RESERVAS_PEDIDO`
--

CREATE TABLE `RESERVAS_PEDIDO` (
  `IdReserva` int(11) NOT NULL,
  `IdPedido` int(11) NOT NULL,
  `NumPersonas` int(11) DEFAULT NULL,
  `HoraIni` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TRABAJADOR`
--

CREATE TABLE `TRABAJADOR` (
  `IdTrabajador` int(11) NOT NULL,
  `Turno` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TRABAJADOR_PEDIDO`
--

CREATE TABLE `TRABAJADOR_PEDIDO` (
  `IdTrabajador` int(11) NOT NULL,
  `IdPedido` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ALERGENOS`
--
ALTER TABLE `ALERGENOS`
  ADD PRIMARY KEY (`IdAlergeno`);

--
-- Indices de la tabla `CLIENTES`
--
ALTER TABLE `CLIENTES`
  ADD PRIMARY KEY (`IdCliente`);

--
-- Indices de la tabla `CLIENTE_ALERGENOS`
--
ALTER TABLE `CLIENTE_ALERGENOS`
  ADD PRIMARY KEY (`IdCliente`,`IdAlergeno`),
  ADD KEY `IdAlergeno` (`IdAlergeno`);

--
-- Indices de la tabla `CLIENTE_PEDIDO`
--
ALTER TABLE `CLIENTE_PEDIDO`
  ADD PRIMARY KEY (`IdPedido`,`IdCliente`),
  ADD KEY `IdCliente` (`IdCliente`);

--
-- Indices de la tabla `INGREDIENTES`
--
ALTER TABLE `INGREDIENTES`
  ADD PRIMARY KEY (`IdIngrediente`);

--
-- Indices de la tabla `INGREDIENTES_ALERGENOS`
--
ALTER TABLE `INGREDIENTES_ALERGENOS`
  ADD PRIMARY KEY (`IdAlergeno`,`IdIngrediente`),
  ADD KEY `IdIngrediente` (`IdIngrediente`);

--
-- Indices de la tabla `PEDIDO`
--
ALTER TABLE `PEDIDO`
  ADD PRIMARY KEY (`IdPedido`);

--
-- Indices de la tabla `PEDIDO_RECETAS`
--
ALTER TABLE `PEDIDO_RECETAS`
  ADD PRIMARY KEY (`IdPedido`,`IdReceta`),
  ADD KEY `IdReceta` (`IdReceta`);

--
-- Indices de la tabla `RECETAS`
--
ALTER TABLE `RECETAS`
  ADD PRIMARY KEY (`IdReceta`);

--
-- Indices de la tabla `RECETAS_INGREDIENTES`
--
ALTER TABLE `RECETAS_INGREDIENTES`
  ADD PRIMARY KEY (`IdReceta`,`IdIngrediente`),
  ADD KEY `IdIngrediente` (`IdIngrediente`);

--
-- Indices de la tabla `RESERVAS`
--
ALTER TABLE `RESERVAS`
  ADD PRIMARY KEY (`IdReserva`);

--
-- Indices de la tabla `RESERVAS_PEDIDO`
--
ALTER TABLE `RESERVAS_PEDIDO`
  ADD PRIMARY KEY (`IdPedido`,`IdReserva`),
  ADD KEY `IdReserva` (`IdReserva`);

--
-- Indices de la tabla `TRABAJADOR`
--
ALTER TABLE `TRABAJADOR`
  ADD PRIMARY KEY (`IdTrabajador`);

--
-- Indices de la tabla `TRABAJADOR_PEDIDO`
--
ALTER TABLE `TRABAJADOR_PEDIDO`
  ADD PRIMARY KEY (`IdTrabajador`,`IdPedido`),
  ADD KEY `IdPedido` (`IdPedido`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `CLIENTE_ALERGENOS`
--
ALTER TABLE `CLIENTE_ALERGENOS`
  ADD CONSTRAINT `CLIENTE_ALERGENOS_ibfk_1` FOREIGN KEY (`IdCliente`) REFERENCES `CLIENTES` (`IdCliente`),
  ADD CONSTRAINT `CLIENTE_ALERGENOS_ibfk_2` FOREIGN KEY (`IdAlergeno`) REFERENCES `ALERGENOS` (`IdAlergeno`);

--
-- Filtros para la tabla `CLIENTE_PEDIDO`
--
ALTER TABLE `CLIENTE_PEDIDO`
  ADD CONSTRAINT `CLIENTE_PEDIDO_ibfk_1` FOREIGN KEY (`IdPedido`) REFERENCES `PEDIDO` (`IdPedido`),
  ADD CONSTRAINT `CLIENTE_PEDIDO_ibfk_2` FOREIGN KEY (`IdCliente`) REFERENCES `CLIENTES` (`IdCliente`);

--
-- Filtros para la tabla `INGREDIENTES_ALERGENOS`
--
ALTER TABLE `INGREDIENTES_ALERGENOS`
  ADD CONSTRAINT `INGREDIENTES_ALERGENOS_ibfk_1` FOREIGN KEY (`IdAlergeno`) REFERENCES `ALERGENOS` (`IdAlergeno`),
  ADD CONSTRAINT `INGREDIENTES_ALERGENOS_ibfk_2` FOREIGN KEY (`IdIngrediente`) REFERENCES `INGREDIENTES` (`IdIngrediente`);

--
-- Filtros para la tabla `PEDIDO_RECETAS`
--
ALTER TABLE `PEDIDO_RECETAS`
  ADD CONSTRAINT `PEDIDO_RECETAS_ibfk_1` FOREIGN KEY (`IdPedido`) REFERENCES `PEDIDO` (`IdPedido`),
  ADD CONSTRAINT `PEDIDO_RECETAS_ibfk_2` FOREIGN KEY (`IdReceta`) REFERENCES `RECETAS` (`IdReceta`);

--
-- Filtros para la tabla `RECETAS_INGREDIENTES`
--
ALTER TABLE `RECETAS_INGREDIENTES`
  ADD CONSTRAINT `RECETAS_INGREDIENTES_ibfk_1` FOREIGN KEY (`IdReceta`) REFERENCES `RECETAS` (`IdReceta`),
  ADD CONSTRAINT `RECETAS_INGREDIENTES_ibfk_2` FOREIGN KEY (`IdIngrediente`) REFERENCES `INGREDIENTES` (`IdIngrediente`);

--
-- Filtros para la tabla `RESERVAS_PEDIDO`
--
ALTER TABLE `RESERVAS_PEDIDO`
  ADD CONSTRAINT `RESERVAS_PEDIDO_ibfk_1` FOREIGN KEY (`IdReserva`) REFERENCES `RESERVAS` (`IdReserva`),
  ADD CONSTRAINT `RESERVAS_PEDIDO_ibfk_2` FOREIGN KEY (`IdPedido`) REFERENCES `PEDIDO` (`IdPedido`);

--
-- Filtros para la tabla `TRABAJADOR_PEDIDO`
--
ALTER TABLE `TRABAJADOR_PEDIDO`
  ADD CONSTRAINT `TRABAJADOR_PEDIDO_ibfk_1` FOREIGN KEY (`IdPedido`) REFERENCES `PEDIDO` (`IdPedido`),
  ADD CONSTRAINT `TRABAJADOR_PEDIDO_ibfk_2` FOREIGN KEY (`IdTrabajador`) REFERENCES `TRABAJADOR` (`IdTrabajador`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
